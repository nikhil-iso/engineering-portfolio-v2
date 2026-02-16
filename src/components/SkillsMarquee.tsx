const skills = [
  { name: "Python", icon: "🐍" },
  { name: "C/C++", icon: "⚙️" },
  { name: "MATLAB", icon: "📊" },
  { name: "Arduino", icon: "🔌" },
  { name: "SolidWorks", icon: "🔧" },
  { name: "AutoCAD", icon: "📐" },
  { name: "Fusion 360", icon: "🛠️" },
  { name: "KiCad", icon: "🖥️" },
  { name: "Git/GitHub", icon: "🐙" },
  { name: "HTML/CSS", icon: "🌐" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React", icon: "⚛️" },
  { name: "LTspice", icon: "📈" },
  { name: "Linux", icon: "🐧" },
  { name: "Excel", icon: "📗" },
  { name: "OnShape", icon: "🔩" },
];

const SkillsMarquee = () => {
  const doubled = [...skills, ...skills];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold gradient-text text-center mb-2">Technical Skills</h2>
        <p className="text-muted-foreground text-center">Tools, languages, and platforms I work with</p>
      </div>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee">
          {doubled.map((skill, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 flex flex-col items-center gap-2 p-6 rounded-xl glow-border bg-card/50 min-w-[120px]"
            >
              <span className="text-3xl">{skill.icon}</span>
              <span className="text-sm text-foreground font-medium whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
