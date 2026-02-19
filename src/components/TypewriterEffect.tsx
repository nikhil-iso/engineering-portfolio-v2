import { useState, useEffect, memo } from "react";

const titles = [
  "President of USST",
  "Propulsion Lead for USST Rocketry",
  "USask Electrical Engineering",
];

const TypewriterEffect = memo(function TypewriterEffect() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const title = titles[currentTitle];
    const timeout = isDeleting ? 40 : 80;

    if (!isDeleting && currentChar === title.length) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (isDeleting && currentChar === 0) {
      setIsDeleting(false);
      setCurrentTitle((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentChar((prev) => prev + (isDeleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [currentChar, isDeleting, currentTitle]);

  return (
    <span className="text-lg md:text-xl text-muted-foreground">
      <span className="text-secondary">{titles[currentTitle].substring(0, currentChar)}</span>
      <span className="typewriter-cursor">&nbsp;</span>
    </span>
  );
});

export default TypewriterEffect;

