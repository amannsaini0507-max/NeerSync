import logging
import httpx
from typing import Dict, Any, Optional
from app.config import settings

logger = logging.getLogger(__name__)


class MLPredictClient:
    """
    Plug-in client calling Member A's ML anomaly / supply prediction service.
    Gracefully falls back to deterministic rule engine if service is unreachable.
    """

    def __init__(self, service_url: Optional[str] = None, timeout_sec: Optional[float] = None):
        self.service_url = service_url or settings.ml_service_url
        self.timeout_sec = timeout_sec or settings.ml_service_timeout_sec

    async def predict_anomalies(self, telemetry_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Queries Member A's /predict service for ML-detected anomalies.
        Returns prediction dictionary with 'anomaly_detected', 'confidence', 'type', and 'source'.
        """
        try:
            async with httpx.AsyncClient(timeout=self.timeout_sec) as client:
                response = await client.post(self.service_url, json=telemetry_data)
                if response.status_code == 200:
                    data = response.json()
                    data["source"] = "ml_predict_service"
                    return data
                logger.warning("ML predict service returned HTTP %s. Falling back to rules.", response.status_code)
        except Exception as exc:
            logger.info("Member A ML service unreachable (%s). Executing deterministic fallback.", str(exc))

        # Deterministic Fallback Logic
        return self._rule_fallback(telemetry_data)

    def _rule_fallback(self, telemetry_data: Dict[str, Any]) -> Dict[str, Any]:
        """Deterministic rule evaluation fallback when ML service is offline."""
        t_type = telemetry_data.get("type")
        values = telemetry_data.get("values", {})
        anomalies = []

        if t_type == "pressure":
            pressure = values.get("pressure_kpa", 0.0)
            if pressure < 70.0:
                anomalies.append({
                    "type": "low_pressure",
                    "severity": "high" if pressure < 40.0 else "medium",
                    "reason": f"Tail-end pressure {pressure} kPa is below standard 70 kPa"
                })
        elif t_type == "flow":
            flow = values.get("flow_lpm", 0.0)
            if flow <= 0.0:
                anomalies.append({
                    "type": "no_supply",
                    "severity": "high",
                    "reason": "Flow rate dropped to zero during supply interval"
                })
        elif t_type == "quality":
            turbidity = values.get("turbidity_ntu", 0.0)
            chlorine = values.get("chlorine_mgl", 0.5)
            ph = values.get("ph", 7.0)

            if turbidity > 5.0:
                anomalies.append({
                    "type": "quality",
                    "severity": "high",
                    "reason": f"Turbidity {turbidity} NTU exceeds drinking limit 5.0 NTU"
                })
            if chlorine < 0.20 or chlorine > 1.0:
                anomalies.append({
                    "type": "quality",
                    "severity": "medium",
                    "reason": f"Residual chlorine {chlorine} mg/L outside safe range (0.2-1.0 mg/L)"
                })
            if ph < 6.5 or ph > 8.5:
                anomalies.append({
                    "type": "quality",
                    "severity": "high",
                    "reason": f"pH {ph} outside permissible range 6.5-8.5"
                })

        return {
            "source": "rule_engine_fallback",
            "anomaly_detected": len(anomalies) > 0,
            "anomalies": anomalies
        }


ml_client = MLPredictClient()
