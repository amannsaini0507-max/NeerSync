"""
NeerSync Isolation Forest Multivariate Anomaly Detector
Detects subtle non-linear multivariate drifts in pressure, flow, and pump current.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest


class AnomalyDetector:
    def __init__(self, contamination: float = 0.05, random_state: int = 42):
        self.model = IsolationForest(
            contamination=contamination,
            random_state=random_state,
            n_estimators=100
        )
        self.is_fitted = False
        self.feature_names = ["pressure_kpa", "flow_lpm", "current_a", "esr_level_cm"]

    def extract_features(self, metrics_list: list) -> np.ndarray:
        """Extracts numerical feature matrix from a list of metric dictionaries."""
        features = []
        for m in metrics_list:
            p = m.get("pressure", {}).get("pressure_kpa", 120.0)
            f = m.get("flow", {}).get("flow_lpm", 200.0)
            c = m.get("pump", {}).get("current_a", 0.0)
            l = m.get("esr", {}).get("level_cm", 250.0)
            features.append([p, f, c, l])
        return np.array(features)

    def fit(self, baseline_metrics: list):
        """Fits the Isolation Forest on clean baseline telemetry."""
        X = self.extract_features(baseline_metrics)
        self.model.fit(X)
        self.is_fitted = True
        return self

    def score_samples(self, metrics_list: list) -> np.ndarray:
        """Returns anomaly score normalized between 0.0 (normal) and 1.0 (highly anomalous)."""
        if not self.is_fitted:
            raise RuntimeError("AnomalyDetector must be fitted before scoring samples.")
        X = self.extract_features(metrics_list)
        # raw decision_function: higher is normal, lower is anomalous
        raw_scores = self.model.decision_function(X)
        # Invert and normalize: 0 = normal, 1 = anomalous
        normalized_scores = 1.0 / (1.0 + np.exp(raw_scores * 8.0))
        return normalized_scores

    def predict(self, metrics: dict, threshold: float = 0.65) -> dict:
        """Evaluates a single telemetry snapshot."""
        if not self.is_fitted:
            # Auto-fit on synthetic normal baseline bounds
            synthetic_normal = []
            for _ in range(200):
                synthetic_normal.append({
                    "pressure": {"pressure_kpa": float(np.random.normal(135.0, 10.0))},
                    "flow": {"flow_lpm": float(np.random.normal(250.0, 30.0))},
                    "pump": {"current_a": float(np.random.choice([0.0, 14.5]))},
                    "esr": {"level_cm": float(np.random.normal(280.0, 40.0))}
                })
            self.fit(synthetic_normal)

        score = float(self.score_samples([metrics])[0])
        is_anomaly = score > threshold
        return {
            "anomaly_score": round(score, 4),
            "is_anomaly": is_anomaly,
            "threshold": threshold,
            "model": "IsolationForest_v1.0"
        }
