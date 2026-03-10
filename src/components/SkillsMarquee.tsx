import { useMemo, memo } from "react";

const skillCategories = [
  {
    title: "Engineering Tools",
    skills: [
      { name: "Excel", img: "/icons/excel.png" },
      { name: "Fusion 360", img: "/icons/fusion-360.png" },
      { name: "Inventor", img: "/icons/inventor.png" },
      { name: "ANSYS", img: "/icons/ansys.png" },
      { name: "OpenRocket", img: "/icons/openrocket.png" },
      { name: "SketchUp", img: "/icons/sketchup.png" },
      { name: "Revit", img: "/icons/revit.png" },
      { name: "Civil 3D", img: "/icons/civil-3d.png" },
      { name: "SolidWorks", img: "/icons/solidworks.png" },
      { name: "OnShape", img: "/icons/onshape.png" },
      { name: "AutoCAD", img: "/icons/autocad.png" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "C/C++", img: "/icons/cpp.png" },
      { name: "MATLAB", img: "/icons/matlab.png" },
      { name: "Java", img: "/icons/java.png" },
      { name: "HTML5", img: "/icons/html5.png" },
      { name: "CSS", img: "https://img.icons8.com/color/96/css3.png" },
    ],
  },
  {
    title: "Platforms",
    skills: [
      { name: "Vercel", img: "/icons/vercel.png" },
      { name: "GitHub", img: "/icons/github.png" },
      { name: "MS Project", img: "/icons/microsoft-project.png" },
      { name: "Autodesk", img: "/icons/autodesk.png" },
      { name: "Google Suite", img: "/icons/google-suite.png" },
      { name: "MS Office", img: "/icons/microsoft-office.png" },
    ],
  },
];

const MIN_ITEMS = 12;
const BASE_MARQUEE_DURATION_SECONDS = 30;
const REFERENCE_ROW_TITLE = "Platforms";

const SkillsMarquee = memo(function SkillsMarquee() {
  const rows = useMemo(() => {
    const preparedRows = skillCategories.map((category) => {
      const repeatCount = Math.max(1, Math.ceil(MIN_ITEMS / category.skills.length));
      const repeated = Array.from({ length: repeatCount }, () => category.skills).flat();
      const looped = [...repeated, ...repeated];
      return { ...category, looped, travelUnits: repeated.length };
    });

    const referenceTravelUnits =
      preparedRows.find((row) => row.title === REFERENCE_ROW_TITLE)?.travelUnits ?? preparedRows[0]?.travelUnits ?? 1;

    return preparedRows.map((row) => ({
      ...row,
      animationDurationSeconds: (BASE_MARQUEE_DURATION_SECONDS * row.travelUnits) / referenceTravelUnits,
    }));
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold gradient-text text-center mb-2">Technical Skills</h2>
        <p className="text-muted-foreground text-center">Tools, languages, and platforms I work with</p>
      </div>

      {rows.map((category) => (
        <div key={category.title} className="mb-10">
          <h3 className="text-lg font-semibold text-foreground/80 text-center mb-4">{category.title}</h3>
          <div className="marquee-row overflow-hidden relative mx-auto w-full md:w-[75%]">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <div
              className="flex w-max animate-marquee"
              style={{ animationDuration: `${category.animationDurationSeconds}s` }}
            >
              {category.looped.map((skill, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-2 sm:mx-4 flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl glow-border bg-card/50 min-w-[100px] sm:min-w-[140px]"
                >
                  <img
                    src={skill.img}
                    alt={skill.name}
                    className="w-9 h-9 sm:w-12 sm:h-12 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-base text-foreground font-medium whitespace-nowrap">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
});

export default SkillsMarquee;
