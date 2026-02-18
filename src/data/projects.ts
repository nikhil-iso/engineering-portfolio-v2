export interface PersonalProject {
  id: string;
  title: string;
  skills: string[];
  learnings: string[];
  description: string;
  span?: 1 | 2 | 3; // column span in the 3-col grid
}

export interface TeamProject {
  id: string;
  title: string;
  objective: string;
  teamSize: number;
  technologies: string[];
  role: string;
  description: string;
  span?: 1 | 2 | 3; // column span in the 3-col grid
}

export const personalProjects: PersonalProject[] = [
  {
    id: "custom-pcb",
    title: "Custom PCB Design",
    skills: ["KiCad", "Circuit Design", "Soldering"],
    learnings: [
      "Learned PCB layout best practices",
      "Gained experience with SMD components",
    ],
    description:
      "Designed and fabricated a custom PCB for sensor data acquisition. The board features an STM32 microcontroller with integrated power regulation and communication interfaces.",
    span: 1,
  },
  {
    id: "home-automation",
    title: "Home Automation System",
    skills: ["Arduino", "C++", "IoT", "3D Printing"],
    learnings: [
      "Integrated multiple communication protocols",
      "Designed custom 3D-printed enclosures",
    ],
    description:
      "Built a home automation system using Arduino-based controllers to manage lighting, temperature, and security sensors with a custom mobile dashboard.",
    span: 2,
  },
  {
    id: "robot-arm",
    title: "3-DOF Robotic Arm",
    skills: ["SolidWorks", "Python", "Servo Control"],
    learnings: [
      "Applied inverse kinematics",
      "Practiced mechanical design for manufacturability",
    ],
    description:
      "Designed and built a 3-degree-of-freedom robotic arm with Python-based control software for pick-and-place operations.",
    span: 1,
  },
];

export const teamProjects: TeamProject[] = [
  {
    id: "usst-rocket",
    title: "USST Hybrid Rocket Engine",
    objective: "Design and test a student-built hybrid rocket propulsion system",
    teamSize: 12,
    technologies: ["SolidWorks", "MATLAB", "Sensor Integration"],
    role: "Propulsion Lead — oversaw engine design, testing, and safety protocols",
    span: 3,
    description:
      "Led the propulsion sub-team in designing a hybrid rocket engine using nitrous oxide and HTPB. Conducted multiple static fire tests and iterated on injector and combustion chamber design.",
  },
  {
    id: "cansat",
    title: "CanSat Competition Entry",
    objective: "Build a satellite in a can that collects atmospheric data during descent",
    teamSize: 8,
    technologies: ["Arduino", "C++", "PCB Design", "Telemetry"],
    role: "Electrical Lead — designed the avionics and telemetry systems",
    span: 2,
    description:
      "Developed the avionics stack for a CanSat competition entry, including sensor integration, real-time telemetry downlink, and GPS tracking with a custom PCB.",
  },
  {
    id: "solar-car",
    title: "Solar-Powered Vehicle",
    objective: "Design an energy-efficient solar-powered vehicle for competition",
    teamSize: 20,
    technologies: ["AutoCAD", "Power Electronics", "Battery Management"],
    role: "Electrical Systems Engineer — designed the power distribution network",
    span: 1,
    description:
      "Contributed to the electrical systems of a solar-powered vehicle, focusing on maximum power point tracking (MPPT) and battery management system design.",
  },
];
