/**
 * JalSetu 3D Village Digital Twin - Fault Declarations & Presets
 */

export const FAULT_DEFINITIONS = [
  {
    key: 'pump',
    title: 'Pump Failure',
    desc: 'Motor thermal trip: current drops to 0 A, pump ceases filling ESR',
    severity: 'high',
    location: [-14, 4.0, -9],
  },
  {
    key: 'leak',
    title: 'Slow Leak, Branch B',
    desc: 'Hidden subterranean loss (~35 LPM) near household B3 on the ridge',
    severity: 'medium',
    location: [15, 6.0, 0],
  },
  {
    key: 'burst',
    title: 'Pipe Burst, Branch A',
    desc: 'Catastrophic rupture (~120 LPM) near household A2: fountain & rapid tank drain',
    severity: 'high',
    location: [-10.5, 3.8, 0],
  },
  {
    key: 'choke',
    title: 'Choked Pipe, Branch C',
    desc: 'Severe silt/scale deposition in Branch C header starves tail-end taps',
    severity: 'medium',
    location: [0, 3.8, 6],
  },
  {
    key: 'rain',
    title: 'Monsoon Contamination',
    desc: 'Surface runoff ingress: turbidity spikes >5 NTU, chlorine washes out <0.20 mg/L',
    severity: 'high',
    location: [0, 8.0, -9],
  },
];

export const SCENARIO_PRESETS = [
  {
    id: 'monsoon_week',
    name: 'Monsoon Week Scenario',
    description: 'Heavy rain triggers turbidity surge at dawn, followed by ground saturation pipeline burst in Ward 1.',
    durationMinutes: 1440,
    timeline: [
      { minute: 60, action: 'fault_on', fault: 'rain', notice: 'Heavy rainfall starts: runoff into shallow borewell aquifer.' },
      { minute: 360, action: 'notice', notice: 'Morning supply begins: turbid water reaches household taps.' },
      { minute: 600, action: 'fault_on', fault: 'burst', notice: 'Soil displacement causes pipe rupture on Branch A.' },
    ],
  },
  {
    id: 'summer_shortage',
    name: 'Summer Shortage & Choke',
    description: 'Reservoir depleted during peak heatwave; sediment choke starves tail-end households.',
    durationMinutes: 1440,
    timeline: [
      { minute: 30, action: 'fault_on', fault: 'choke', notice: 'Sediment buildup restricts Branch C transmission header.' },
      { minute: 360, action: 'notice', notice: 'Morning supply: Ward 3 tail end receives zero water.' },
    ],
  },
  {
    id: 'dawn_pump_trip',
    name: 'Pump Trip at Dawn',
    description: 'Electrical transformer trip at 05:45 AM before morning supply causes reservoir starvation.',
    durationMinutes: 720,
    timeline: [
      { minute: 345, action: 'fault_on', fault: 'pump', notice: 'Transformer fault trips submersible pump starter at 05:45 AM.' },
      { minute: 360, action: 'notice', notice: 'Morning supply opens: tank drains rapidly without refill.' },
    ],
  },
];
