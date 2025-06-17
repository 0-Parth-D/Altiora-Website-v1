import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const AnimatedContent = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  delay = 0,
  threshold = 0.1,
  className = "",
  onComplete,
}) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);

          const axis = direction === "horizontal" ? "x" : "y";
          const offset = reverse ? -distance : distance;

          gsap.set(el, {
            [axis]: offset,
            opacity: animateOpacity ? initialOpacity : 1,
            scale,
          });

          gsap.to(el, {
            [axis]: 0,
            opacity: 1,
            scale: 1,
            duration,
            ease,
            delay,
            onComplete,
          });

          setHasAnimated(true);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    delay,
    threshold,
    onComplete,
    hasAnimated,
  ]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default AnimatedContent;
