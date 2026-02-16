const skillCategories = [
  {
    title: "Engineering Tools",
    skills: [
      { name: "Excel", img: "https://img.icons8.com/color/96/microsoft-excel-2019--v1.png" },
      { name: "Fusion 360", img: "https://img.icons8.com/color/96/autodesk-fusion-360.png" },
      { name: "Inventor", img: "https://img.icons8.com/color/96/autodesk-inventor.png" },
      { name: "ANSYS", img: "https://cdn.simscale.com/wp-content/uploads/2017/09/ansys-logo.png" },
      { name: "OpenRocket", img: "https://openrocket.info/img/openrocket-logo.png" },
      { name: "SketchUp", img: "https://img.icons8.com/color/96/sketchup.png" },
      { name: "Revit", img: "https://img.icons8.com/color/96/autodesk-revit.png" },
      { name: "Civil 3D", img: "https://img.icons8.com/color/96/autodesk-autocad.png" },
      { name: "SolidWorks", img: "https://img.icons8.com/color/96/solidworks.png" },
      { name: "OnShape", img: "https://companieslogo.com/img/orig/onshape-55d8ec43.png" },
      { name: "AutoCAD", img: "https://img.icons8.com/color/96/autocad.png" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "C/C++", img: "https://img.icons8.com/color/96/c-plus-plus-logo.png" },
      { name: "MATLAB", img: "https://img.icons8.com/fluency/96/matlab.png" },
      { name: "Java", img: "https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png" },
      { name: "HTML5", img: "https://img.icons8.com/color/96/html-5--v1.png" },
      { name: "CSS", img: "https://img.icons8.com/color/96/css3.png" },
    ],
  },
  {
    title: "Platforms",
    skills: [
      { name: "Vercel", img: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
      { name: "GitHub", img: "https://img.icons8.com/glyph-neue/96/FFFFFF/github.png" },
      { name: "MS Project", img: "https://img.icons8.com/color/96/microsoft-project-2019.png" },
      { name: "Autodesk", img: "https://img.icons8.com/color/96/autodesk.png" },
      { name: "Google Suite", img: "https://img.icons8.com/color/96/google-logo.png" },
      { name: "MS Office", img: "https://img.icons8.com/color/96/microsoft-office-2019.png" },
    ],
  },
];

const SkillsMarquee = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold gradient-text text-center mb-2">Technical Skills</h2>
        <p className="text-muted-foreground text-center">Tools, languages, and platforms I work with</p>
      </div>

      {skillCategories.map((category) => {
        const doubled = [...category.skills, ...category.skills];
        return (
          <div key={category.title} className="mb-10">
            <h3 className="text-lg font-semibold text-foreground/80 text-center mb-4">{category.title}</h3>
            <div className="overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
              <div className="flex animate-marquee">
                {doubled.map((skill, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 mx-4 flex flex-col items-center gap-2 p-5 rounded-xl glow-border bg-card/50 min-w-[110px]"
                  >
                    <img
                      src={skill.img}
                      alt={skill.name}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                    <span className="text-sm text-foreground font-medium whitespace-nowrap">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SkillsMarquee;
