// ═══════════════════════════════════════════════════════════════
// PROJECT DATA — Edit this file to add/update projects.
//
// HOW TO ADD A NEW PROJECT:
//   1. Copy an existing object in the array below
//   2. Change the `id` to a unique URL-friendly slug (e.g. "my-new-project")
//   3. Fill in each field — see the interface comments for guidance
//   4. Save the file — the site rebuilds automatically
// ═══════════════════════════════════════════════════════════════

// ── Personal Project shape ───────────────────────────────────
export interface PersonalProject {
  id: string;            // URL slug, must be unique (e.g. "custom-pcb")
  title: string;         // Display name shown on card & detail page
  description: string;   // Short summary shown on the card
  skills: string[];      // Skill tags shown on the card
  span?: 1 | 2 | 3;     // Column span in the 3-col grid (default 1)

  // ── Detail page fields (shown on /personal-projects/:id) ───
  problemGoal: string;           // What problem were you solving or what was the goal?
  roleAndProcess: string;        // Your specific role and the process you followed
  toolsUsed: string[];           // Tools, software, languages used
  outcome: string;               // Quantifiable results or key takeaways
}

// ── Team Project shape ───────────────────────────────────────
export interface TeamProject {
  id: string;            // URL slug, must be unique (e.g. "usst-rocket")
  title: string;         // Display name shown on card & detail page
  description: string;   // Short summary shown on the card
  objective: string;     // One-liner objective
  teamSize: number;      // Total team members
  peopleManaged?: number;// How many you directly managed (optional)
  myTitle: string;       // Your title on the project (e.g. "Propulsion Lead")
  technologies: string[];// Tech tags shown on card
  role: string;          // Brief role description for the card
  span?: 1 | 2 | 3;     // Column span in the 3-col grid (default 1)

  // ── Detail page fields (shown on /team-projects/:id) ───────
  problemGoal: string;           // What problem were you solving or what was the goal?
  roleAndProcess: string;        // Your specific role and the process you followed
  toolsUsed: string[];           // Tools, software, languages used
  outcome: string;               // Quantifiable results or key takeaways
}

// ═══════════════════════════════════════════════════════════════
// PERSONAL PROJECTS
// Add new projects by copying an object and changing the fields.
// ═══════════════════════════════════════════════════════════════
export const personalProjects: PersonalProject[] = [
  {
    id: "custom-pcb",
    title: "Custom PCB Design",
    description:
      "Designed and fabricated a custom PCB for sensor data acquisition. The board features an STM32 microcontroller with integrated power regulation and communication interfaces.",
    skills: ["KiCad", "Circuit Design", "Soldering"],
    span: 1,

    // Detail page content — edit these for the full project page
    problemGoal:
      "Needed a compact, reliable data-acquisition board that could read multiple analog sensors and transmit data over UART.",
    roleAndProcess:
      "Sole designer. Went from schematic capture in KiCad through PCB layout, fabrication ordering, hand-soldering SMD components, and firmware bring-up.",
    toolsUsed: ["KiCad", "STM32CubeIDE", "Soldering Station", "Oscilloscope"],
    outcome:
      "Successfully fabricated and tested 3 board revisions. Final board achieved < 1% sensor read error and fit within a 50 × 40 mm footprint.",
  },
  {
    id: "home-automation",
    title: "Home Automation System",
    description:
      "Built a home automation system using Arduino-based controllers to manage lighting, temperature, and security sensors with a custom mobile dashboard.",
    skills: ["Arduino", "C++", "IoT", "3D Printing"],
    span: 2,

    problemGoal:
      "Wanted a low-cost, modular home automation setup that didn't depend on cloud services.",
    roleAndProcess:
      "Designed the hardware nodes, wrote the firmware in C++, 3D-printed custom enclosures, and built a local web dashboard for control.",
    toolsUsed: ["Arduino IDE", "C++", "ESP8266", "Fusion 360", "HTML/CSS"],
    outcome:
      "Deployed 6 sensor nodes across the house. System runs fully offline with < 200 ms response times.",
  },
  {
    id: "robot-arm",
    title: "3-DOF Robotic Arm",
    description:
      "Designed and built a 3-degree-of-freedom robotic arm with Python-based control software for pick-and-place operations.",
    skills: ["SolidWorks", "Python", "Servo Control"],
    span: 1,

    problemGoal:
      "Build an affordable desktop robotic arm capable of repeatable pick-and-place tasks for a university project.",
    roleAndProcess:
      "Modeled the arm in SolidWorks, 3D-printed the links, and wrote a Python inverse-kinematics solver to drive servo motors over serial.",
    toolsUsed: ["SolidWorks", "Python", "Arduino", "3D Printer"],
    outcome:
      "Achieved ± 2 mm positional repeatability. Demonstrated live pick-and-place of small objects during the final presentation.",
  },
];

// ═══════════════════════════════════════════════════════════════
// TEAM PROJECTS
// Add new projects by copying an object and changing the fields.
// ═══════════════════════════════════════════════════════════════
export const teamProjects: TeamProject[] = [
  {
    id: "usst-rocket",
    title: "USST Hybrid Rocket Engine",
    objective: "Design and test a student-built hybrid rocket propulsion system",
    teamSize: 12,
    myTitle: "Propulsion Lead",
    peopleManaged: 6,
    technologies: ["SolidWorks", "MATLAB", "Sensor Integration"],
    role: "Oversaw engine design, testing, and safety protocols",
    span: 3,
    description:
      "Led the propulsion sub-team in designing a hybrid rocket engine using nitrous oxide and HTPB. Conducted multiple static fire tests and iterated on injector and combustion chamber design.",

    // Detail page content
    problemGoal:
      "Design, build, and static-fire test a hybrid rocket engine for the university rocketry team's competition entry.",
    roleAndProcess:
      "As Propulsion Lead I managed 6 engineers, defined the test plan, led design reviews, and coordinated with the structures team for integration. I personally designed the injector plate and ran CFD analysis.",
    toolsUsed: ["SolidWorks", "MATLAB", "ANSYS Fluent", "LabVIEW", "Lathe & Mill"],
    outcome:
      "Completed 4 successful static fires. Engine delivered 1,200 N thrust for 6 s burn time. Team placed 3rd nationally.",
  },
  {
    id: "cansat",
    title: "CanSat Competition Entry",
    objective: "Build a satellite in a can that collects atmospheric data during descent",
    teamSize: 8,
    myTitle: "Electrical Lead",
    peopleManaged: 3,
    technologies: ["Arduino", "C++", "PCB Design", "Telemetry"],
    role: "Designed the avionics and telemetry systems",
    span: 2,
    description:
      "Developed the avionics stack for a CanSat competition entry, including sensor integration, real-time telemetry downlink, and GPS tracking with a custom PCB.",

    problemGoal:
      "Create a reliable avionics and telemetry system that fits inside a 350 ml soda-can form-factor and survives a 1 km drop.",
    roleAndProcess:
      "Led the electrical sub-team of 3. Designed the PCB schematic and layout, selected components, wrote the telemetry firmware, and ran environmental testing.",
    toolsUsed: ["KiCad", "Arduino IDE", "C++", "LoRa Module", "Logic Analyzer"],
    outcome:
      "System transmitted 10 Hz telemetry over 2 km range with zero packet loss. Team finished in the top 10 nationally.",
  },
  {
    id: "solar-car",
    title: "Solar-Powered Vehicle",
    objective: "Design an energy-efficient solar-powered vehicle for competition",
    teamSize: 20,
    myTitle: "Electrical Systems Engineer",
    technologies: ["AutoCAD", "Power Electronics", "Battery Management"],
    role: "Designed the power distribution network",
    span: 1,
    description:
      "Contributed to the electrical systems of a solar-powered vehicle, focusing on maximum power point tracking (MPPT) and battery management system design.",

    problemGoal:
      "Develop the power electronics that maximise energy harvest from the solar array while safely managing a 48 V lithium-ion battery pack.",
    roleAndProcess:
      "Worked within the electrical team to design the MPPT controller, wire the battery management system, and validate the full power path on a test bench before vehicle integration.",
    toolsUsed: ["AutoCAD", "LTspice", "Altium Designer", "Multimeter", "Power Supply"],
    outcome:
      "Achieved 97% MPPT efficiency. Battery pack passed all safety checks and the vehicle completed the competition endurance event.",
  },
];
