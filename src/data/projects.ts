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
  images?: string[];             // Image paths for project gallery (e.g. ["/projects/my-project/photo1.jpg"])
}

// ── Team Project shape ───────────────────────────────────────
export interface TeamProject {
  id: string;            // URL slug, must be unique (e.g. "usst-rocketry")
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
  myFocus: string;               // What you specifically focused on / your area of expertise
  roleAndProcess: string;        // Your specific role and the process you followed
  toolsUsed: string[];           // Tools, software, languages used
  outcome: string;               // Quantifiable results or key takeaways

  images?: string[];             // Image paths for project gallery (e.g. ["/projects/my-project/photo1.jpg"])

  // Optional extended project metadata
  competitionResult?: string;
  competitionSeason?: string;
  keyContributions?: string[];
  engineeringFocus?: string[];
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
];

// ═══════════════════════════════════════════════════════════════
// TEAM PROJECTS
// Add new projects by copying an object and changing the fields.
// ═══════════════════════════════════════════════════════════════
export const teamProjects: TeamProject[] = [

  {
    id: "usst-rocketry",
    title: "Project \"UP 2: Down\" - USST Rocketry",
    objective:
      "Redesign, modify, and compete with an upgraded and modified \"Project UP\" at Launch Canada 2026 while improving on the previous years shortcomings. ",
    teamSize: 26,
    myTitle: "Propulsion Lead",
    peopleManaged: 2,
    technologies: [
      "SolidWorks",
      "Fusion 360",
      "ANSYS FEA",
      "OpenRocket",
      "MATLAB",
      "Excel",
      "Composite Manufacturing",
      "CNC Machining",
    ],
    role: "Led propulsion optimization and aft-end subsystem design for competition flight",
    span: 3,
    description:
      "During Janurary of 2026, I was elected President of the USST, where I shifted my focus from entirely technical to take on greater tasks such as project management and team organization. I preformed organizational duties on top of my .",
    competitionResult:
      "8th nationally at Launch Canada 2025, 16,500 ft apogee, Spirit Bear Award for community impact",
    keyContributions: [
      "Designed and manufactured composite aerodynamic boat tail for base drag reduction",
      "Engineered threaded external motor retention system for serviceability and axial load transfer",
      "Developed thrust plate ensuring clean thrust load path into fuselage",
      "Performed structural simulation at 8 kN thrust loads",
      "Used Rayleigh drag relation to justify aerodynamic performance gains",
    ],
    engineeringFocus: [
      "Aerodynamic drag reduction",
      "Structural load path design",
      "Motor integration and CG optimization",
      "Manufacturability and serviceability",
      "System level design tradeoff analysis",
    ],
    problemGoal:
      "Design, manufacture, and compete with an M class high power rocket at Launch Canada 2025 while optimizing propulsion integration and aerodynamic performance.",
    myFocus:
      "Aerodynamic drag reduction, structural load path design, motor integration and CG optimization, manufacturability, and system-level tradeoff analysis.",
    roleAndProcess:
      "Designed and manufactured a composite aerodynamic boat tail, engineered a threaded external motor retention system, developed an aluminum thrust plate for clean load transfer into the fuselage, and validated key design choices through structural simulation and drag analysis.",
    toolsUsed: [
      "SolidWorks",
      "Fusion 360",
      "ANSYS FEA",
      "OpenRocket",
      "MATLAB",
      "Excel",
      "Composite Manufacturing",
      "CNC Machining",
    ],
    outcome:
      "Placed 8th nationally at Launch Canada 2025, achieved 16,500 ft apogee, and received the Spirit Bear Award for community impact.",
    images: ["/placeholder.svg", "/placeholder.svg"],
  },








  {
    id: "usst-rocketry",
    title: "Project \"UP\" - USST Rocketry",
    objective:
      "Design, manufacture, and compete with an M class high power rocket at Launch Canada 2025 while optimizing propulsion integration and aerodynamic performance.",
    teamSize: 24,
    myTitle: "Propulsion Lead",
    peopleManaged: 3,
    technologies: [
      "SolidWorks",
      "Fusion 360",
      "ANSYS FEA",
      "OpenRocket",
      "MATLAB",
      "Excel",
      "Composite Manufacturing",
      "CNC Machining",
    ],
    role: "Led propulsion integration and aft-end subsystem design for competition flight",
    span: 3,
    description:
      "Led propulsion integration for an M class high power rocket competing at Launch Canada 2025. Personally responsible for the aft end propulsion interface including the composite boat tail, aluminum thrust plate, and threaded crown motor retention system. Approached the subsystem as a system level engineering problem balancing aerodynamic drag reduction, structural integrity, stability margins, and field serviceability. Used drag area analysis and structural FEA to validate design decisions. Final configuration contributed to a significant increase in apogee performance, reaching 16,500 ft and placing 8th nationally.",
    competitionResult:
      "8th nationally at Launch Canada 2025, 16,500 ft apogee, Spirit Bear Award for community impact",
    keyContributions: [
      "Designed and manufactured composite aerodynamic boat tail for base drag reduction",
      "Engineered threaded external motor retention system for serviceability and axial load transfer",
      "Developed thrust plate ensuring clean thrust load path into fuselage",
      "Performed structural simulation at 8 kN thrust loads",
      "Used Rayleigh drag relation to justify aerodynamic performance gains",
    ],
    engineeringFocus: [
      "Aerodynamic drag reduction",
      "Structural load path design",
      "Motor integration and CG optimization",
      "Manufacturability and serviceability",
      "System level design tradeoff analysis",
    ],
    problemGoal:
      "Design, manufacture, and compete with an M class high power rocket at Launch Canada 2025 while optimizing propulsion integration and aerodynamic performance.",
    myFocus:
      "Aerodynamic drag reduction, structural load path design, motor integration and CG optimization, manufacturability, and system-level tradeoff analysis.",
    roleAndProcess:
      "Designed and manufactured a composite aerodynamic boat tail, engineered a threaded external motor retention system, developed an aluminum thrust plate for clean load transfer into the fuselage, and validated key design choices through structural simulation and drag analysis.",
    toolsUsed: [
      "SolidWorks",
      "Fusion 360",
      "ANSYS FEA",
      "OpenRocket",
      "MATLAB",
      "Excel",
      "Composite Manufacturing",
      "CNC Machining",
    ],
    outcome:
      "Placed 8th nationally at Launch Canada 2025, achieved 16,500 ft apogee, and received the Spirit Bear Award for community impact.",
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "frc-4627-manning",
    title: "FRC 4627 Manning Robotics - Drivetrain Development",
    objective:
      "Design and optimize competition drivetrain systems for FIRST Robotics Competition performance.",
    teamSize: 40,
    myTitle: "Mechanical Drivetrain Lead",
    peopleManaged: 5,
    technologies: [
      "SolidWorks",
      "Excel",
      "Mechanical Power Transmission",
      "Gear Ratio Optimization",
      "Swerve Drive Systems",
      "DC Motor Analysis",
    ],
    role: "Led drivetrain architecture, analysis, and subsystem execution for competition performance",
    span: 2,
    description:
      "Served as Mechanical Drivetrain Lead for FRC Team 4627, overseeing drivetrain design and performance optimization for the 2023 competition season. Led a team developing both a dual tank drive system and the team's first swerve drive prototype. Performed torque speed analysis and gear ratio optimization using motor specifications and Excel based modeling to balance acceleration and pushing power. Managed subsystem fabrication, testing, and integration under strict build season timelines.",
    competitionSeason: "2023 FRC Season",
    keyContributions: [
      "Led development of team's first swerve drive prototype",
      "Directed drivetrain subsystem design for primary competition robot",
      "Optimized dual tank drive system with 8:1 gear ratio",
      "Performed torque and speed analysis using motor data sheets and Excel modeling",
      "Managed drivetrain manufacturing and assembly timeline",
    ],
    engineeringFocus: [
      "Gear ratio optimization",
      "Torque speed tradeoff analysis",
      "Mechanical integration under competition constraints",
      "Rapid prototyping and iterative testing",
      "Subsystem leadership and coordination",
    ],
    problemGoal:
      "Design and optimize competition drivetrain systems for FIRST Robotics Competition performance.",
    myFocus:
      "Gear ratio optimization, torque-speed tradeoff analysis, drivetrain integration under competition constraints, and subsystem leadership.",
    roleAndProcess:
      "Led drivetrain subsystem design for the competition robot, directed development of the team's first swerve prototype, optimized a dual tank drive with an 8:1 ratio, and managed manufacturing and assembly schedules through the build season.",
    toolsUsed: [
      "SolidWorks",
      "Excel",
      "Mechanical Power Transmission",
      "Gear Ratio Optimization",
      "Swerve Drive Systems",
      "DC Motor Analysis",
    ],
    outcome:
      "Delivered competition-ready drivetrain systems for the 2023 FRC season, including a validated 8:1 tank setup and a successful first swerve prototype.",
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "skills-alberta-2023",
    title: "Skills Alberta Robotics Competition 2023",
    objective:
      "Design and deploy a coordinated multi robot system to compete in a provincial robotics challenge.",
    teamSize: 3,
    myTitle: "Mechanical and Systems Lead",
    technologies: [
      "Mechanum Drive",
      "Robot Coordination",
      "Rapid Prototyping",
      "Mechanical Design",
      "Embedded Control",
    ],
    role: "Co-led strategy and mechanical systems for a coordinated two-robot architecture",
    span: 1,
    description:
      "Competed provincially in the 2023 Skills Alberta Robotics Competition, placing 3rd overall. Our team engineered a coordinated two robot solution consisting of a mechanum drive shooter platform and a secondary robot dedicated to ball collection and feeding. The system design focused on maximizing scoring efficiency through division of labor and controlled positioning. Contributed to drivetrain implementation, shooting system design, and overall strategy optimization under strict competition timelines.",
    competitionResult: "3rd Place Provincially",
    keyContributions: [
      "Co designed dual robot strategy using shooter bot and collector bot",
      "Implemented mechanum drive system for omnidirectional positioning",
      "Optimized shooting mechanism for repeatable scoring accuracy",
      "Coordinated subsystem integration under limited development time",
    ],
    engineeringFocus: [
      "System level strategy design",
      "Omnidirectional drivetrain implementation",
      "Mechanical shooter mechanism development",
      "Multi robot task allocation",
      "Rapid competition prototyping",
    ],
    problemGoal:
      "Design and deploy a coordinated multi robot system to compete in a provincial robotics challenge.",
    myFocus:
      "System-level strategy, mechanum drivetrain implementation, shooter mechanism design, and multi-robot task allocation.",
    roleAndProcess:
      "Co-designed a two-robot scoring strategy, implemented the mechanum drivetrain for precise positioning, iterated on the shooter mechanism for repeatable scoring, and coordinated integration under strict competition timelines.",
    toolsUsed: [
      "Mechanum Drive",
      "Robot Coordination",
      "Rapid Prototyping",
      "Mechanical Design",
      "Embedded Control",
    ],
    outcome:
      "Placed 3rd at the provincial level with a coordinated shooter-collector architecture that improved scoring throughput.",
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: "nasa-space-apps-2024",
    title: "NASA Space Apps Challenge 2024 - ExoSpace",
    objective:
      "Develop a web based platform that visualizes NASA open data to improve accessibility and educational impact within a 48 hour hackathon.",
    teamSize: 6,
    myTitle: "Systems and Product Lead",
    technologies: [
      "Web Development",
      "NASA Open Data",
      "GIS",
      "Spatial Data Visualization",
      "Open Source Mapping",
    ],
    role: "Led system direction and data-to-story mapping for a community-focused geospatial platform",
    span: 2,
    description:
      "Built ExoSpace during the NASA Space Apps Challenge 2024 as a web-based platform for exploring open-source NASA and community datasets through spatial visualization. The team framed the product around a community storytelling map, combining Earth observation data with local contextual layers to surface patterns, trends, and anomalies in a form accessible to non-experts.",
    keyContributions: [
      "Defined the community mapping problem and system narrative for the hackathon scope",
      "Structured open-source spatial datasets into a map-first exploration workflow",
      "Coordinated rapid feature tradeoffs to deliver a working demo in 48 hours",
      "Integrated science-backed geospatial context to improve educational usability",
    ],
    engineeringFocus: [
      "Spatial data storytelling",
      "Open-data integration",
      "Rapid product prototyping",
      "Map-based user experience design",
      "Time-boxed system tradeoff decisions",
    ],
    problemGoal:
      "Develop a web based platform that visualizes NASA open data to improve accessibility and educational impact within a 48 hour hackathon.",
    myFocus:
      "System-level product framing, open-data integration strategy, and map-based storytelling to connect physical geography with community issues.",
    roleAndProcess:
      "Worked with a six-person team to define scope, identify relevant open datasets, and build a map-centric experience that layered Earth observation and community context. Prioritized rapid iteration and clear visual communication to ship a complete demo within hackathon constraints.",
    toolsUsed: [
      "Web Development",
      "NASA Open Data",
      "GIS",
      "Spatial Data Visualization",
      "Open Source Mapping",
    ],
    outcome:
      "Delivered a complete 48-hour hackathon prototype that made NASA open data more accessible through an interactive community map narrative.",
    images: ["/placeholder.svg", "/placeholder.svg"],
  },
];
