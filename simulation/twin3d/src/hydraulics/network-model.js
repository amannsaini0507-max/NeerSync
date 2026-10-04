/**
 * NeerSync 3D Village Digital Twin - Hydraulic Network Model Topology
 * Generates topological graph with 3 branches, 15 nodes, elevations, and FHTCs.
 */

import { BRANCH_CONFIG, PIPE_SPECS, VILLAGE_CONFIG } from '../config.js';

export function createNetworkModel() {
  const nodes = [];
  const pipes = [];
  const households = [];

  // Elevation of key infrastructure
  const ESR_GROUND_Z = 8.0;   // Elevated knoll
  const PUMP_GROUND_Z = 4.0;  // Western pump house terrace
  const JUNCTION_J0_Z = 4.5;  // Main distribution header

  const ESR_POS = [0, ESR_GROUND_Z, -9];
  const PUMP_POS = [-14, PUMP_GROUND_Z, -9];
  const J0_POS = [0, JUNCTION_J0_Z, 0];

  let fhtcIndex = 1;

  BRANCH_CONFIG.forEach((branch, bIdx) => {
    const branchNodes = [];
    const ortho = [-branch.dir[1], branch.dir[0]]; // Perpendicular vector for house spacing

    for (let i = 0; i < 5; i++) {
      const dist = 6 + 4.5 * i; // Distance along branch main
      const side = (i % 2 === 0) ? 1 : -1;
      const groundZ = branch.elevation_profile[i];

      const nodeX = branch.dir[0] * dist;
      const nodeY = groundZ;
      const nodeZ = branch.dir[1] * dist;

      // Household offset from main line
      const houseX = nodeX + ortho[0] * side * 3.5;
      const houseY = groundZ;
      const houseZ = nodeZ + ortho[1] * side * 3.5;

      const fhtcNum = String(fhtcIndex).padStart(4, '0');
      const fhtcId = `FHTC-${VILLAGE_CONFIG.state}-${VILLAGE_CONFIG.lgd_gp_code}-${fhtcNum}`;
      const nodeId = `${branch.id}${i + 1}`;

      // Mark vulnerable public institutions
      let siteType = 'residential';
      let siteLabel = `Household ${nodeId}`;
      if (branch.id === 'A' && i === 2) {
        siteType = 'anganwadi';
        siteLabel = 'Anganwadi Centre 01 (Vulnerable Site)';
      } else if (branch.id === 'C' && i === 1) {
        siteType = 'school';
        siteLabel = 'Govt Primary School (Vulnerable Site)';
      }

      const node = {
        branchId: branch.id,
        bIdx,
        index: i,
        id: nodeId,
        fhtc_id: fhtcId,
        pos: [nodeX, nodeY, nodeZ],
        housePos: [houseX, houseY, houseZ],
        elevation: groundZ,
        siteType,
        siteLabel,
        ward: `Ward ${bIdx + 1}`,
        // Dynamic hydraulic state
        P: 12.0,        // Pressure head in metres
        P_kpa: 117.7,   // Pressure in kPa (1 m head = 9.80665 kPa)
        q: 0.0,         // Tap demand (L/min)
        leak: 0.0,      // Leak discharge (L/min)
        cd: 0.0,        // Emitter discharge coefficient
        res: 1.0,       // Pipe resistance multiplier (choke fault)
        cl: 0.45,       // Chlorine (mg/L)
        tu: 1.1,        // Turbidity (NTU)
        reported: false // Citizen grievance submitted
      };

      branchNodes.push(node);
      households.push(node);
      fhtcIndex++;
    }

    nodes.push(branchNodes);
  });

  return {
    ESR_POS,
    PUMP_POS,
    J0_POS,
    ESR_GROUND_Z,
    PUMP_GROUND_Z,
    JUNCTION_J0_Z,
    nodes,
    households,
  };
}
