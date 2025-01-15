import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function MouseCircle() {
  const blurCircleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { pageX, pageY } = e;

      // Move the blur circle
      gsap.to(blurCircleRef.current, {
        x: pageX,
        y: pageY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    // Add event listener for mouse movement
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Hide the default cursor when the user is on the document
    document.body.style.cursor = "none";

    // Reset the cursor when the component is unmounted
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <>
      {/* Blur Circle Only */}
      <div
        ref={blurCircleRef}
        className="absolute top-0 left-0 w-20 h-20 bg-[#278468] rounded-full blur-2xl opacity-100 pointer-events-none z-40"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
    </>
  );
}

export default MouseCircle;
