// ═══════════════════════════════════════════════════════════════
// PROJECT DATA — Edit this file to add/update projects.
//
// HOW TO ADD A NEW PROJECT:
//   1. Copy an existing object in the array below
//   2. Change the `id` to a unique URL-friendly slug (e.g. "my-new-project")
//   3. Fill in each field — see the interface comments for guidance
//   4. Save the file — the site rebuilds automatically
// ═══════════════════════════════════════════════════════════════

// ── Gallery item — supports images and videos ────────────────
export interface GalleryItem {
  type: 'image' | 'video';      // Media type
  src: string;                   // Path to image or video file
  poster?: string;               // Optional poster/thumbnail for videos
}

// ── External project material link ───────────────────────────
export interface ProjectMaterial {
  label: string;                 // Button label shown in the materials section
  url: string;                   // External URL (GitHub repo, docs, files, etc.)
}

// ── Personal Project shape ───────────────────────────────────
export interface PersonalProject {
  id: string;            // URL slug, must be unique (e.g. "custom-pcb")
  title: string;         // Display name shown on card & detail page
  description: string;   // Short summary shown on the card
  skills: string[];      // Skill tags shown on the card
  span?: 1 | 2 | 3;     // Column span in the 3-col grid (default 1)
  cardImage?: string;    // Image path for project card (e.g. "/images/my-card.png")

  // ── Detail page fields (shown on /personal-projects/:id) ───
  problemGoal: string;           // What problem were you solving or what was the goal?
  roleAndProcess: string;        // Your specific role and the process you followed
  toolsUsed: string[];           // Tools, software, languages used
  outcome: string;               // Quantifiable results or key takeaways
  images?: string[];             // Image paths for project gallery (kept for backward compat)
  gallery?: GalleryItem[];       // Mixed media gallery (images + videos). If provided, used instead of `images`.
  materials?: ProjectMaterial[]; // External links for docs, repos, files, and related materials
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
  cardImage?: string;    // Image path for project card (e.g. "/images/my-card.png")

  // ── Detail page fields (shown on /team-projects/:id) ───────
  problemGoal: string;           // What problem were you solving or what was the goal?
  myFocus: string;               // What you specifically focused on / your area of expertise
  roleAndProcess: string;        // Your specific role and the process you followed
  toolsUsed: string[];           // Tools, software, languages used
  outcome: string;               // Quantifiable results or key takeaways

  images?: string[];             // Image paths for project gallery (kept for backward compat)
  gallery?: GalleryItem[];       // Mixed media gallery (images + videos). If provided, used instead of `images`.
  materials?: ProjectMaterial[]; // External links for docs, repos, files, and related materials

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
    id: "simulight-sunrise",
    title: "SimuLight Sunrise",
    description:
      "An open-source sunrise alarm clock that gradually increases room brightness to work with natural sleep cycles, featuring Wi-Fi scheduling, smooth ramp curves, and full documentation for reproducibility.",
    skills: ["ESP32", "C++", "Python", "Circuit Design", "3D Printing", "Open Source"],
    span: 3,
    cardImage: "/images/SimuLight Wide Banner Website.png",

    problemGoal:
      "Standard alarm clocks felt harsh, and commercial sunrise lamps were either closed-source, lacked scheduling/customization, or were too expensive for experimentation.\n\nThe goal was to design a fully open-source sunrise alarm that gradually increases brightness to transition the body toward wakefulness more naturally — including the hardware, firmware, enclosure, and documentation.",
    roleAndProcess:
      "Sole designer and developer. The design centers on a Wi-Fi capable microcontroller (ESP32) controlling a high-current MOSFET to drive a 12V lighting load, with a DS3231 RTC as a fallback time base for schedule reliability without network access.\n\nBrightness transitions use smooth Bezier-style easing over configurable 30–90 minute windows rather than simple linear ramps. Scheduling and overrides are handled through lightweight JSON-style control objects, making it easy to add features like sunset routines or weekend schedules without rewriting the architecture.\n\nBuilt a Python desktop utility for adjusting ramp profiles and scheduler presets without manual reflashing.\n\nDocumentation was written for full third-party reproducibility — including circuit/BOM packages, firmware notes, scheduler logic, quick-start smart-home integration guide, and a calibration/troubleshooting section.",
    toolsUsed: ["ESP32", "C++", "Python", "DS3231 RTC", "MOSFET Switching", "KiCad", "Fusion 360", "JSON", "GitHub"],
    outcome:
      "Lamp ramps from off to full brightness with no perceptible stepping. Schedule execution remains consistent even without network (RTC fallback).\n\nPWM tuned to minimize visible flicker, mid-80% efficiency range depending on load.\n\nRan a small user trial (~6 users) with qualitative feedback pointing to reduced grogginess compared to traditional alarms, guiding default ramp curve selection.",
    materials: [
      {
        label: "View GitHub Repository",
        url: "https://github.com/nikhil-iso/SimulightSunrise",
      },
    ],
    images: ["/images/SimuLight Wide Banner Website.png", "/images/SimuLightPCB.png", "/images/SimuLightPCB3D.png", "/images/Sunrise Alarm Breadboard image.jpg"],
  },
  {
    id: "arduino-macropad",
    title: "Arduino-Based Macropad",
    description:
      "A low-cost, customizable macro keypad built around an Arduino Micro with native USB HID support, designed for accessibility users and power users with modular switch/encoder support.",
    skills: ["Arduino", "C++", "USB HID", "CAD", "3D Printing", "Open Source"],
    span: 2,
    cardImage: "/images/MacroKeyboard Banner Website.png",

    problemGoal:
      "Many existing macro keyboards are closed-source, expensive, or inflexible in hardware and firmware customization.\n\nThe goal was to build a modifiable, cross-platform input device that could be adapted to different user requirements — particularly for accessibility needs or specialized workflows — while remaining serviceable and modular.",
    roleAndProcess:
      "Sole designer and developer. Built around an Arduino Micro for native USB HID support. The hardware consists of a 4×2 key matrix using Cherry MX mechanical switches, supporting rapid iteration and hot-swap replacement without desoldering.\n\nDeveloped custom firmware implementing multi-profile macro storage, per-key remapping, and adjustable debounce timing — all handled deterministically in firmware without host-side software dependencies.\n\nDesigned and 3D-printed an ergonomic enclosure with a slight typing angle, plus custom keycaps for clearer labeling and alternative geometries.\n\nDocumentation covers HID report handling, macro execution logic, complete BOM, wiring diagrams, enclosure assembly, and accessibility contribution guidelines.",
    toolsUsed: ["Arduino Micro", "C++", "USB HID", "Cherry MX Switches", "Fusion 360", "3D Printing", "GitHub"],
    outcome:
      "Plug-and-play USB HID operation on Windows, macOS, and Linux with no drivers required. Sub-5 ms debounce variance for responsive input.\n\nAssembly time under 30 minutes per unit. Open-source release resulted in early community engagement validating the project's relevance and extensibility.",
    materials: [
      {
        label: "View GitHub Repository",
        url: "https://github.com/nikhil-iso/Arduino-Macropad",
      },
    ],
    images: ["/images/MacroKeyboard Banner Website.png", "/images/Macropad V2 (WIP) v10.png"],
  },
  {
    id: "opencv-detection-platform",
    title: "OpenCV Detection Platform",
    description:
      "An image detection system using the OpenCV library to identify patterns through a webcam and drive motors to target detected objects — inspired by Carbon Robotics' laser weeder for industrial farms.",
    skills: ["Python", "OpenCV", "Computer Vision", "Motor Control", "Embedded Systems"],
    span: 1,
    cardImage: "/images/OpenCV_logo_black.svg.png",

    problemGoal:
      "Develop a computer vision platform that can detect specific patterns or objects through a live webcam feed and actuate motors to point at said pattern or object. The concept is inspired by Carbon Robotics' laser weeder — an industrial farming tool that identifies weeds and destroys them with a laser. This project aims to replicate that detection-and-targeting pipeline at a smaller scale.",
    roleAndProcess:
      "Currently in active development. Building the vision pipeline using Python and OpenCV for real-time pattern recognition, with motor control integration to physically track and target detected objects. The system architecture separates detection, tracking, and actuation into modular stages for easier iteration and testing.",
    toolsUsed: ["Python", "OpenCV", "Webcam", "Motor Controllers", "Embedded Systems"],
    outcome:
      "Project is currently in progress — detection pipeline and motor integration under active development.",
    images: ["/placeholder.svg"],
  },
];

// ═══════════════════════════════════════════════════════════════
// TEAM PROJECTS
// Add new projects by copying an object and changing the fields.
// ═══════════════════════════════════════════════════════════════
export const teamProjects: TeamProject[] = [

  {
    id: "usst-rocketry-theseus",
    title: "Project \"Theseus\" - USST Rocketry",
    objective:
      "Redesign, modify, and compete with an upgraded and improved \"Project UP\" at Launch Canada 2026 while addressing the previous year's shortcomings.",
    teamSize: 26,
    myTitle: "President & Propulsion Lead",
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
    role: "Undertook the presidential role, balancing organizational leadership with propulsion subsystem design.",
    span: 3,
    cardImage: "/images/Project Up2 Banner.png",
    description:
      "In January 2026, I was elected President of the USST, taking on broader organizational duties including project management, team coordination, and stakeholder communication alongside my continuing technical responsibilities as propulsion lead.",
    competitionResult:
      "TBD at Launch Canada 2026",
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
      "Motor integration and CG-COP optimization",
      "Manufacturability and serviceability",
      "System level design tradeoff analysis",
    ],
    problemGoal:
      "Design, manufacture, and compete with an upgraded M class high power rocket at Launch Canada 2026 while optimizing propulsion integration and aerodynamic performance.",
    myFocus:
      "Aerodynamic drag reduction, weight reduction, structural load path design, motor integration and CG optimization, manufacturability, and system-level tradeoff analysis.",
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
      "TBD at Launch Canada 2026",
    images: ["/images/USST Logo 1.png"],
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
    cardImage: "/images/Project Up Banner.png",
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
    gallery: [
      { type: 'video', src: '/images/Project Up Launch Video.mp4' },
      { type: 'image', src: '/images/Project Up Banner.png' },
      { type: 'image', src: '/images/Project Up Rocket Overview.png' },
      { type: 'image', src: '/images/Project Up Lower Assembly Section View Annotated.png' },
      { type: 'image', src: '/images/Project Up Thrust Plate Annotated.png' },
      { type: 'image', src: '/images/Project UpLower Section Annotated.png' },
    ],
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
    role: "Led drivetrain architecture, analysis, and optimization for competitive performance",
    span: 2,
    cardImage: "/images/4627Thor.png",
    description:
      "Served as Mechanical Drivetrain Lead for FRC Team 4627 Manning Robotics, overseeing drivetrain design and performance optimization for the 2023 competition season. Led a team developing both a dual tank drive system and the team's first swerve drive prototype. Performed torque speed analysis and gear ratio optimization using motor specifications and Excel based modeling to balance acceleration and pushing power. Managed subsystem fabrication, testing, and integration under strict build season timelines.",
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
    images: ["/images/4627Thor.png", "/images/4627logo.png"],
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
    role: "Co-led strategy and mechanical systems for a coordinated two-robot setup",
    span: 1,
    cardImage: "/images/skillsbot.JPG",
    description:
      "Competed provincially in the 2023 Skills Alberta Robotics Competition, placing 3rd overall. Our team engineered a coordinated two robot solution consisting of a mechanum drive shooter platform and a secondary robot dedicated to ball collection and feeding. The system design focused on maximizing scoring efficiency through division of labor and controlled positioning. Contributed to drivetrain implementation, shooting system design, and overall strategy optimization under strict competition timelines.",
    competitionResult: "3rd Place Provincially",
    keyContributions: [
      "Co designed dual robot strategy using shooter bot and collector bot",
      "Implemented mechanum drive system for multidirectional positioning",
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
    images: ["/images/skillsbot.JPG"],
  },
  {
    id: "nasa-space-apps-2024",
    title: "NASA Space Apps Challenge 2024 - ExoSpace",
    objective:
      "Develop a platform that to improve accessibility to exoplanet education within a 48 hour hackathon.",
    teamSize: 6,
    myTitle: "Product and Systems Lead",
    technologies: [
      "Web Development",
      "NASA Open Data",
      "Data Visualization",
      "Accessibility",
      "Information Architecture",
      "GIS",
    ],
    role: "Led product framing and system design for a public facing exoplanet learning experience",
    span: 1,
    cardImage: "/images/nasaExoplanet.jpg",
    description:
      "Built ExoSpace during the NASA Space Apps Challenge 2024 as a web-based platform for exploring open-source NASA and community datasets through spatial visualization. The team framed the product around exoplanet education, providing an interactive way to explore and understand exoplanetary systems.",
    keyContributions: [
      "Defined the core learning goals and user journey for a 48 hour demo",
      "Curated NASA open datasets into a small, explorable attribute set",
      "Outlined a map first navigation flow with filters and explainer panels",
      "Coordinated scope cuts and task planning to ship on time",
      "Wrote plain language explanations to reduce scientific jargon",
    ],
    engineeringFocus: [
      "Educational UX and clarity",
      "Open data modeling and curation",
      "Rapid prototyping under time constraints",
      "Map based storytelling",
      "Accessibility first content structure",
    ],
    problemGoal:
      "Make exoplanet education approachable by turning NASA open data into a guided, explorable experience that non experts can understand within a 48 hour build window.",
    myFocus:
      "Product framing, dataset selection, and interaction design that turned raw data into an understandable learning flow.",
    roleAndProcess:
      "Led work sessions to define the target audience, learning goals, and setting project boundaries for a 48-hour build. Translated those decisions into product development flowcharts, then executed tasks across data visualization, and content writing so each feature supported the same educational narrative.\n\nRan frequent scope checks to keep the team on schedule, and wrote plain-language explanations to make technical exoplanet data approachable for first-time users.",
    toolsUsed: [
      "JavaScript",
      "HTML/CSS",
      "NASA Exoplanet Archive",
      "Open Source Mapping",
      "Data Visualization",
      "GitHub",
    ],
    outcome:
      "Shipped a complete 48-hour prototype featuring interactive map exploration, filterable exoplanet attributes, and accessibility-first explainers. The final demo validated the core concept: complex NASA open data could be turned into a clear, guided learning experience for non-expert audiences.",
    images: ["/images/nasaExoplanet.jpg"],
  },
];
