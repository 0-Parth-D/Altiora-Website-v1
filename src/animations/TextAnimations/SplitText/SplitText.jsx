import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

const SplitText = ({
  children,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const splitter = new GSAPSplitText(el, {
            type: splitType,
            absolute: absoluteLines,
            linesClass: "split-line",
          });

          let targets;
          switch (splitType) {
            case "lines":
              targets = splitter.lines;
              break;
            case "words":
              targets = splitter.words;
              break;
            case "words, chars":
              targets = [...splitter.words, ...splitter.chars];
              break;
            default:
              targets = splitter.chars;
          }

          gsap.set(targets, { ...from, immediateRender: false, force3D: true });

          gsap.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
            onComplete: onLetterAnimationComplete,
          });

          setHasAnimated(true);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [
    children,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    onLetterAnimationComplete,
    hasAnimated,
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {children}
    </p>
  );
};

export default SplitText;
