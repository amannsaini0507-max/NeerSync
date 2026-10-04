# NeerSync Field Installation Guide (ग्रामीण स्थापना एवं रखरखाव मार्गदर्शिका)

**Target Audience**: Gram Panchayat Pump Operators, Jal Surakshaks (जल सुरक्षक), and Field Technicians  
**Language**: English & Hindi (हिंदी)  
**Standard**: Jal Jeevan Mission (JJM) Smart Water Management Guidelines  

---

## 1. Safety Rules & Warnings (सुरक्षा नियम एवं सावधानियां)

> [!CAUTION]
> ### ⚡ खतरा: 415V / 230V बिजली का झटका (HIGH VOLTAGE DANGER)
> - **पंप स्टार्टर पैनल (Pump Starter Panel) में कनेक्शन केवल प्रमाणित इलेक्ट्रीशियन (Certified Electrician) द्वारा ही किया जाना चाहिए।**
> - **काम शुरू करने से पहले मेन स्विच / एमसीबी (MCB) को अनिवार्य रूप से बंद (OFF / LOCKOUT) करें।**
> - **ईएसपी32 (ESP32) को कभी भी 230V या 415V की तारों से सीधे न जोड़ें। केवल दिए गए पीजेडईएम (PZEM-004T) या सीटी क्लैंप (CT Clamp) का उपयोग करें।**

---

## 2. Tools & Materials Required (आवश्यक उपकरण एवं सामग्री)

| Tool / Item | Name in Hindi | Purpose |
|---|---|---|
| Multimeter | मल्टीमीटर | Measuring battery, solar voltage, and continuity |
| Hand Drill & 6mm/8mm bits | ड्रिल मशीन एवं बिट्स | Mounting enclosure to masonry wall / pole |
| Adjustable Spanner / Wrench | रिंच / पाना | Tightening cable glands and pipe adapters |
| Teflon Tape | टेफ्लॉन टेप | Sealing pressure transducer and flow threads |
| Wire Stripper & Screwdriver | पेचकस एवं प्लास | Terminal block wire connections |
| Magnetic Compass / Phone App | दिशा सूचक (कंपास) | Orienting solar panel True South |
| 10 sq mm Copper Ground Wire | अर्थिंग तार | Surge suppressor grounding to earth pit |

---

## 3. Node Installation Procedures (नोड स्थापना प्रक्रिया)

### 3.1 Node N1: Tube-well / Pump Monitoring Node (पंप मॉनिटरिंग नोड)
1. **Location**: Mount the IP65 enclosure on the wall of the pump house at eye level ($1.5\,\text{m}$ height), at least $1.0\,\text{m}$ away from strong electromagnetic contactors.
2. **Current Transformer (CT Clamp) Placement**:
   * Clip the **SCT-013 split-core CT** around **ONE phase wire only** leading to the pump motor (do NOT clip both Phase and Neutral together, or readings will cancel to zero).
   * Ensure the latch clicks shut firmly.
3. **Voltage Measurement**:
   * Connect the isolated voltage input leads from the PZEM-004T module to the output terminals of the main pump starter contactor (Phase & Neutral).
4. **Antenna**: Route the external GSM antenna outside the pump house building if the structure has a metal tin roof.

---

### 3.2 Node N2: Overhead Storage Reservoir Node (पानी की टंकी / ESR नोड)
1. **Ultrasonic Level Sensor Mounting (A02YYUW / JSN-SR04T)**:
   * Mount the probe on the tank top manhole or inspection hatch facing vertically downward toward the water surface.
   * **Distance from wall**: Mount at least $30\,\text{cm} - 50\,\text{cm}$ away from vertical tank walls to prevent acoustic side-lobe reflection false echos.
   * **Dead Zone**: Ensure the sensor face is at least $25\,\text{cm}$ above the maximum overflow water level.
2. **Outlet Feeder Bulk Flow Meter (YF-DN15 / DN20 / Flanged Meter)**:
   * Install the flow sensor on the straight horizontal outlet distribution pipe leaving the ESR.
   * **Straight Run Requirement**: Provide at least **$10 \times \text{Pipe Diameter}$ straight length upstream** and **$5 \times \text{Pipe Diameter}$ downstream** without elbows or valves to ensure laminar flow.
   * Observe the directional arrow stamped on the meter body.

---

### 3.3 Node N3: Tail-End Household Pressure Node (अंतिम छोर दबाव नोड)
1. **Location**: Select the farthest household cluster in the Gram Panchayat (habitation tail-end), where distribution pressure is historically lowest.
2. **Plumbing Connection**:
   * Install a $1/2" \times 1/4"$ reducing tee on the main household service pipe before the household tap.
   * Apply 4–5 turns of Teflon tape around the transducer threads.
   * Screw the **0.5–4.5V stainless steel pressure transducer** into the female port and hand-tighten plus $1/4$ turn with a wrench. Do not over-tighten.
3. **Enclosure Mounting**: Secure the enclosure to an exterior shade wall or treated pole using M6 stainless fasteners.

---

### 3.4 Node N4: Water Quality / Turbidity Node (जल गुणवत्ता नोड)
1. **Location**: Installed at the water treatment exit or primary school tap point.
2. **Optical Probe Flow-Cell**:
   * Insert the optical turbidity sensor into a bypass transparent flow-cell or small sampling reservoir.
   * Ensure probe windows are fully submerged and free of trapped air bubbles.
3. **Field Test Kit (FTK) Entry (एफटीके मैनुअल प्रविष्टि)**:
   * Jal Surakshaks perform weekly manual chlorine testing using JJM chemical drops (OT kit).
   * Result is submitted in the NeerSync Android PWA or via automated IVR/SMS: `FTK <FHTC_ID> CHL <value>`.

---

## 4. Solar Panel & Power Setup (सौर ऊर्जा स्थापना)

```
        Sun Rays (दोपहर की धूप)
           \  \  \
            \  \  \
       [Solar Panel]  (10W / 18V)
         /
        /  Tilt Angle (झुकाव कोण) = Latitude + 10°
       /__________________ Horizontal
      Facing TRUE SOUTH (दक्षिण दिशा)
```

1. **Orientation (दिशा)**:
   * The solar panel **MUST face TRUE SOUTH (ठीक दक्षिण दिशा)** across India to capture maximum year-round daily solar irradiance.
2. **Tilt Angle (झुकाव कोण)**:
   * Optimal year-round tilt angle is **Local Latitude + $10^\circ$** (e.g. $28^\circ + 10^\circ = 38^\circ$ in Uttar Pradesh/Delhi; $19^\circ + 10^\circ = 29^\circ$ in Maharashtra).
   * This angle optimizes winter sun capture when days are shorter.
3. **Shading Audit (छाया से बचाव)**:
   * Verify zero shadow from trees, water tank railings, or overhead power lines between 9:00 AM and 4:00 PM.
4. **Cable Routing & Drip Loop (ड्रिप लूप)**:
   * Form a downward U-shaped drip loop in all incoming cables immediately before they enter the enclosure cable glands. This forces rainwater to drip off rather than tracking into the box.

---

## 5. Verification & First-Boot Test (चालू करने एवं जांच की विधि)

1. Connect the battery terminal to the mainboard.
2. Observe the **Blue/Green Status LED**:
   * **Blinks 3 times rapidly**: Normal boot and self-test passed.
   * **Solid ON for 3 seconds**: Sensors powered and reading acquired.
   * **Blinks slowly (1 pulse/sec)**: Cellular/LoRa network search and registration.
   * **Single long blink**: Telemetry packet transmitted and acknowledged successfully.
3. Verify on the NeerSync Gram Panchayat Dashboard:
   * Confirm the node appears as **"Online"** with current timestamp.
   * Confirm battery voltage reads between **$3.70\,\text{V} \text{ and } 4.20\,\text{V}$**.
