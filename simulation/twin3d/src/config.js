/**
 * NeerSync 3D Village Digital Twin - Central Configuration & Standards
 * Aligned 100% with /contracts specifications (ids.md, telemetry.schema.json)
 */

export const VILLAGE_CONFIG = {
  lgd_gp_code: '245123',
  gp_name: 'Gram Panchayat Badepur',
  district: 'Meerut',
  state: 'UP',
  scheme_id: 'SCH-UP-245123',
  scheme_name: 'Badepur Piped Water Supply Scheme (SVS)',
  total_households: 15,
  population_served: 92,
  lpcd_target: 55, // JJM Service Level Benchmark (55 Litres Per Capita per Day)
  min_pressure_kpa: 70.0, // JJM tail-end benchmark: 70 kPa (~7.14 m head)
  min_pressure_head_m: 7.14,
  critical_low_head_m: 3.0,
  max_turbidity_ntu: 5.0,
  min_chlorine_mgl: 0.20,
};

export const SENSOR_NODES = {
  PUMP: {
    node_id: 'NS-UP-245123-N001',
    type: 'pump',
    role: 'Source Tube-Well & Submersible Pump',
    location: 'Pump House, Western Ingress',
    coords: [-14, 0, -9],
  },
  ESR: {
    node_id: 'NS-UP-245123-N002',
    type: 'esr_level',
    role: 'Elevated Storage Reservoir (50,000 L, 15m Stage)',
    location: 'High Ridge Knoll (+8m ground)',
    coords: [0, 8, -9],
  },
  FLOW: {
    node_id: 'NS-UP-245123-N003',
    type: 'flow',
    role: 'Bulk Electromagnetic Transmission Meter',
    location: 'Main Distribution Header J0',
    coords: [0, 4.5, 0],
  },
  TAIL_PRESSURE: {
    node_id: 'NS-UP-245123-N004',
    type: 'pressure',
    role: 'Tail-End Pressure Monitor (Branch B / Ridge)',
    location: 'House B5 Terminal Standpost',
    coords: [21, 6.2, 0],
  },
  QUALITY: {
    node_id: 'NS-UP-245123-N005',
    type: 'quality',
    role: 'In-line Multi-parameter Water Quality Probe',
    location: 'ESR Gravity Outlet Staging',
    coords: [0, 4.8, -9],
  },
};

export const BRANCH_CONFIG = [
  {
    id: 'A',
    name: 'Branch A (West Terrace)',
    dir: [-1, 0],
    elevation_profile: [4.2, 3.8, 3.5, 3.2, 3.0], // Mid terrace slope
    color: '#0284c7',
  },
  {
    id: 'B',
    name: 'Branch B (East Ridge)',
    dir: [1, 0],
    elevation_profile: [5.2, 5.6, 6.0, 6.3, 6.5], // High ridge (lower relative pressure)
    color: '#0284c7',
  },
  {
    id: 'C',
    name: 'Branch C (South Pond Valley)',
    dir: [0, 1],
    elevation_profile: [3.8, 2.9, 2.1, 1.4, 0.8], // Sloping to village pond
    color: '#0284c7',
  },
];

export const PIPE_SPECS = {
  C_FACTOR: 130, // Hazen-Williams roughness coefficient for PVC/HDPE
  TRUNK_DIA_MM: 90,
  TRUNK_LEN_M: 72,
  BRANCH_DIAS_MM: [63, 63, 50, 50, 40],
  BRANCH_LENS_M: [40, 32, 32, 32, 32],
  SERVICE_DIA_MM: 20,
  SERVICE_LEN_M: 8,
  TAP_NOMINAL_DEMAND_LPM: 15.0,
  PUMP_RATED_FLOW_LPM: 400.0,
  TANK_MAX_RANGE_M: 4.0,
  TANK_AREA_M2: 2.0, // Cross-sectional area: 4m depth * 2m² = 8,000L active buffer
};

export const SUPPLY_WINDOWS = [
  { start_h: 6.0, end_h: 9.0, label: 'Morning Supply (06:00 - 09:00)' },
  { start_h: 17.0, end_h: 19.0, label: 'Evening Supply (17:00 - 19:00)' },
];

export const DEFAULT_MQTT_CONFIG = {
  broker_url: 'wss://broker.emqx.io:8084/mqtt',
  topic_prefix: 'neersync/v1',
  client_id_prefix: 'neersync-twin3d',
};
