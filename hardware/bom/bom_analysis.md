# JalSetu Bill of Materials (BOM) Cost & Supply Chain Analysis

**Target Budget**: **₹25,000 – ₹45,000 INR per Gram Panchayat (GP)**  
**Standard Village Package**: 1x N1 (Pump), 1x N2 (ESR), 2x N3 (Tail-end Pressure), 1x LoRa Gateway Hub  
**Calculated Package Cost**: **₹36,952 INR** (Well within target budget)  

---

## 1. Per-Node Cost Breakdown Summary

| Node Identifier | Subsystem Function | Total Cost (INR) | Primary Cost Drivers |
|---|---|---|---|
| **N1 Pump Node** | Tube-well running hours, current & voltage | **₹6,003** | 4G Modem (27%), Solar Panel (14%), PZEM Meter (11%) |
| **N2 ESR Node** | Tank water level & feeder outlet bulk flow | **₹7,173** | 4G Modem (23%), Ultrasonic (16%), Solar Panel (12%) |
| **N3 Pressure Node**| Tail-end household water pressure | **₹6,888** | 4G Modem (24%), Pressure Transducer (18%), Solar (12%) |
| **N4 Quality Node** | Water turbidity & manual FTK baseline | **₹6,123** | 4G Modem (27%), Solar Panel (14%), Turbidity Probe (11%) |

---

## 2. Costliest Components & Cheaper Alternatives

```
Component Cost Pareto Chart (Node Average):
  [====================] 4G LTE Cat-1 Modem (₹1,650) - 25%
  [==============] Pressure / Ultrasonic Sensor (₹1,150 - ₹1,250) - 18%
  [==========] Solar PV Panel 10W (₹850) - 13%
  [=======] LoRa SX1276 Module (₹620) - 9%
  [=======] 5200mAh Lithium Battery Pack (₹640) - 9%
  [=====] IP65 Enclosure (₹420) - 6%
  [====] ESP32-WROOM-32D (₹380) - 6%
  [======] Passives, Buck, LDO, Connectors, PCB (₹900) - 14%
```

### 2.1 Component 1: Cellular 4G LTE Cat-1 Modem (SIMCom A7672S / SIM7600)
* **Current Cost**: **₹1,650 INR** (with antenna & SIM connector).
* **Cheaper Alternative A: Dedicated LoRaWAN Star Network (Zero Modem on Edge Nodes)**:
  * By deploying a single central LoRaWAN 8-channel gateway (SX1302, ₹8,500) at the Gram Panchayat Bhawan rooftop, edge nodes (N1, N2, N3) communicate via LoRa (SX1276, ₹620) with zero cellular modems on the nodes.
  * **Cost Reduction**: **Saves ₹1,650 per node**.
  * **Recurring Operational Savings**: Eliminates SIM data recharge fees (4 nodes $\times$ ₹150/month = **₹7,200 INR/year operational OPEX saved per GP**).
* **Cheaper Alternative B: SIM800L 2G Module**:
  * **Cost**: **₹420 INR** (saves **₹1,230 INR per node**).
  * **Trade-off / Risk**: Bharti Airtel and Reliance Jio have decommissioned 2G in multiple telecom circles. Only Vodafone-Idea (Vi) and BSNL support 2G reliably. Recommended only where 2G carrier coverage is formally audited.

---

### 2.2 Component 2: 0.5–4.5V Stainless Steel Pressure Transducer (G1/4" Thread)
* **Current Cost**: **₹1,250 INR**.
* **Cheaper Alternative A: Bare Ceramic Piezoresistive Element (XGZP series)**:
  * **Cost**: **₹350 – ₹450 INR** (saves **₹800 INR per node**).
  * **Trade-off / Risk**: Requires custom potted mechanical manifold and epoxy waterproofing. Vulnerable to water-hammer rupture if not installed with an inline pulsation snubber.
* **Cheaper Alternative B: Plastic Thread Ceramic Transducer (5V)**:
  * **Cost**: **₹650 INR** (saves **₹600 INR**).
  * **Trade-off**: Lower mechanical burst pressure (15 bar vs 30 bar for stainless steel). Suitable for rural low-pressure gravity networks (< 4 bar).

---

### 2.3 Component 3: A02YYUW Waterproof Ultrasonic Level Sensor
* **Current Cost**: **₹1,150 INR**.
* **Cheaper Alternative: JSN-SR04T v3.0 Sensor**:
  * **Cost**: **₹480 INR** (saves **₹670 INR per node**).
  * **Trade-off**: JSN-SR04T has a larger dead band / blind zone ($25\,\text{cm}$ vs $3\,\text{cm}$ for A02YYUW). If the overhead tank fills to within $20\,\text{cm}$ of the roof, JSN-SR04T gives erroneous echo reflections. Suitable if a $30\,\text{cm}$ standoff pipe is mounted above the manhole.

---

### 2.4 Component 4: 10W Monocrystalline Solar Panel
* **Current Cost**: **₹850 INR**.
* **Cheaper Alternative: 5W Polycrystalline Panel**:
  * **Cost**: **₹420 INR** (saves **₹430 INR per node**).
  * **Trade-off**: Daily power output drops from $40\,\text{Wh}$ to $20\,\text{Wh}$. As calculated in `power_budget.md`, daily node consumption is $< 2.0\,\text{Wh/day}$, meaning a 5W panel still provides adequate energy buffer for LoRaWAN-only nodes.

---

## 3. Domestic Indian Sourcing & Supply Chain Resilience

All components have been verified with active stock across established Indian electronic distributors:

| Component Category | Primary Domestic Vendor | Secondary Vendor | Standard Lead Time |
|---|---|---|---|
| **ESP32, LoRa, Sensors** | [Robu.in](https://robu.in) (Pune / MH) | [Tanotis](https://tanotis.com) (Bengaluru / KA) | 2 – 4 Days |
| **Cellular Modems (A7672S)** | [Tanotis](https://tanotis.com) | [ElectronicsComp](https://electronicscomp.com) | 3 – 5 Days |
| **Solar Panels & Brackets** | [Loom Solar](https://loomsolar.com) | Local Solar Dealers | 3 – 5 Days |
| **Enclosures & Glands** | SmartPlast / Local Electrical Dist. | [Robu.in](https://robu.in) | 1 – 2 Days |
| **Custom PCBs (Fabrication)** | [LionCircuits](https://lioncircuits.com) (Bengaluru) | [JLCPCB](https://jlcpcb.com) (Standard Import) | 5 – 8 Days |
