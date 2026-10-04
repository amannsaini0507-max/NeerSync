/**
 * NeerSync 3D Village Digital Twin - Schema Validator
 * Validates emitted IoT telemetry, alerts, and citizen feedback against /contracts schemas.
 */

import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export class ContractsValidator {
  constructor() {
    this.ajv = new Ajv2020({ allErrors: true, strict: false });
    addFormats(this.ajv);

    this.telemetrySchema = null;
    this.alertSchema = null;
    this.feedbackSchema = null;

    this.telemetryValidate = null;
    this.alertValidate = null;
    this.feedbackValidate = null;

    this.initSchemas();
  }

  initSchemas() {
    // Canonical Telemetry Schema Draft 2020-12
    this.telemetrySchema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      required: [
        "schema_version",
        "node_id",
        "lgd_gp_code",
        "scheme_id",
        "ts",
        "seq",
        "type",
        "values",
        "battery_v",
        "rssi_dbm",
        "fw"
      ],
      properties: {
        schema_version: { type: "string", const: "1.0" },
        node_id: { type: "string", pattern: "^NS-[A-Z]{2}-[0-9]+-N[0-9]{3}$" },
        lgd_gp_code: {
          oneOf: [
            { type: "string", pattern: "^[0-9]{4,8}$" },
            { type: "integer", minimum: 1000, maximum: 99999999 }
          ]
        },
        scheme_id: { type: "string", pattern: "^SCH-[A-Z]{2}-[0-9A-Z_]+$" },
        ts: { type: "string", format: "date-time" },
        seq: { type: "integer", minimum: 0 },
        type: { type: "string", enum: ["pump", "esr_level", "flow", "pressure", "quality"] },
        values: { type: "object" },
        battery_v: { type: "number", minimum: 2.0, maximum: 16.0 },
        rssi_dbm: { type: "integer", minimum: -140, maximum: 0 },
        fw: { type: "string", pattern: "^v?[0-9]+\\.[0-9]+\\.[0-9]+(-[a-zA-Z0-9.]+)?$" }
      },
      allOf: [
        {
          if: { properties: { type: { const: "pump" } } },
          then: {
            properties: {
              values: {
                type: "object",
                required: ["current_a", "voltage_v"],
                properties: {
                  current_a: { type: "number", minimum: 0.0, maximum: 200.0 },
                  voltage_v: { type: "number", minimum: 0.0, maximum: 600.0 },
                  state: { type: "integer", enum: [0, 1] },
                  frequency_hz: { type: "number", minimum: 0.0, maximum: 70.0 }
                },
                additionalProperties: false
              }
            }
          }
        },
        {
          if: { properties: { type: { const: "esr_level" } } },
          then: {
            properties: {
              values: {
                type: "object",
                required: ["level_cm"],
                properties: {
                  level_cm: { type: "number", minimum: 0.0, maximum: 3000.0 },
                  level_pct: { type: "number", minimum: 0.0, maximum: 100.0 }
                },
                additionalProperties: false
              }
            }
          }
        },
        {
          if: { properties: { type: { const: "flow" } } },
          then: {
            properties: {
              values: {
                type: "object",
                required: ["flow_lpm"],
                properties: {
                  flow_lpm: { type: "number", minimum: 0.0, maximum: 20000.0 },
                  totalizer_l: { type: "number", minimum: 0.0 }
                },
                additionalProperties: false
              }
            }
          }
        },
        {
          if: { properties: { type: { const: "pressure" } } },
          then: {
            properties: {
              values: {
                type: "object",
                required: ["pressure_kpa"],
                properties: {
                  pressure_kpa: { type: "number", minimum: 0.0, maximum: 2500.0 }
                },
                additionalProperties: false
              }
            }
          }
        },
        {
          if: { properties: { type: { const: "quality" } } },
          then: {
            properties: {
              values: {
                type: "object",
                required: ["turbidity_ntu", "chlorine_mgl"],
                properties: {
                  turbidity_ntu: { type: "number", minimum: 0.0, maximum: 200.0 },
                  chlorine_mgl: { type: "number", minimum: 0.0, maximum: 15.0 },
                  ph: { type: "number", minimum: 0.0, maximum: 14.0 },
                  tds_ppm: { type: "number", minimum: 0.0, maximum: 5000.0 }
                },
                additionalProperties: false
              }
            }
          }
        }
      ],
      additionalProperties: false
    };

    // Canonical Alert Schema
    this.alertSchema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      required: ["alert_id", "type", "severity", "scope", "reason", "created_ts", "status"],
      properties: {
        alert_id: { type: "string", pattern: "^ALT-[A-Za-z0-9_-]+$" },
        type: {
          type: "string",
          enum: ["no_supply", "low_pressure", "leakage", "quality", "node_offline", "chronic_nonfunctional"]
        },
        severity: { type: "string", enum: ["low", "medium", "high"] },
        scope: {
          type: "object",
          required: ["gp", "branch"],
          properties: {
            gp: {
              oneOf: [
                { type: "string", pattern: "^[0-9]{4,8}$" },
                { type: "integer", minimum: 1000, maximum: 99999999 }
              ]
            },
            branch: { type: "string", minLength: 1, maxLength: 100 },
            fhtc_id: { type: "string", pattern: "^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$" }
          },
          additionalProperties: false
        },
        reason: { type: "string", minLength: 5, maxLength: 500 },
        created_ts: { type: "string", format: "date-time" },
        status: { type: "string", enum: ["active", "acknowledged", "resolved"] }
      },
      additionalProperties: false
    };

    // Canonical Feedback Schema
    this.feedbackSchema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      required: ["feedback_id", "fhtc_id", "channel", "category", "lang", "ts"],
      properties: {
        feedback_id: { type: "string", pattern: "^FB-[A-Za-z0-9_-]+$" },
        fhtc_id: { type: "string", pattern: "^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$" },
        channel: { type: "string", enum: ["app", "qr", "whatsapp", "ivr"] },
        category: { type: "string", enum: ["no_water", "low_pressure", "dirty_water", "leakage", "other"] },
        text: { type: "string", maxLength: 1000 },
        photo_url: { type: "string", format: "uri" },
        lat: { type: "number", minimum: -90.0, maximum: 90.0 },
        lon: { type: "number", minimum: -180.0, maximum: 180.0 },
        lang: { type: "string", pattern: "^[a-z]{2}(-[A-Z]{2})?$" },
        ts: { type: "string", format: "date-time" }
      },
      additionalProperties: false
    };

    this.telemetryValidate = this.ajv.compile(this.telemetrySchema);
    this.alertValidate = this.ajv.compile(this.alertSchema);
    this.feedbackValidate = this.ajv.compile(this.feedbackSchema);
  }

  validateTelemetry(packet) {
    const valid = this.telemetryValidate(packet);
    return {
      valid: Boolean(valid),
      errors: this.telemetryValidate.errors || []
    };
  }

  validateAlert(alert) {
    // Strip UI-only helper keys before validating against strict contract
    const cleanAlert = {
      alert_id: alert.alert_id,
      type: alert.type,
      severity: alert.severity,
      scope: {
        gp: alert.scope.gp,
        branch: alert.scope.branch,
        ...(alert.scope.fhtc_id ? { fhtc_id: alert.scope.fhtc_id } : {})
      },
      reason: alert.reason,
      created_ts: alert.created_ts,
      status: alert.status
    };
    const valid = this.alertValidate(cleanAlert);
    return {
      valid: Boolean(valid),
      errors: this.alertValidate.errors || []
    };
  }

  validateFeedback(feedback) {
    const cleanFb = {
      feedback_id: feedback.feedback_id,
      fhtc_id: feedback.fhtc_id,
      channel: feedback.channel,
      category: feedback.category,
      lang: feedback.lang,
      ts: feedback.ts,
      ...(feedback.text ? { text: feedback.text } : {}),
      ...(feedback.lat ? { lat: feedback.lat } : {}),
      ...(feedback.lon ? { lon: feedback.lon } : {})
    };
    const valid = this.feedbackValidate(cleanFb);
    return {
      valid: Boolean(valid),
      errors: this.feedbackValidate.errors || []
    };
  }
}
