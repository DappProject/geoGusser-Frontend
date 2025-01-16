import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigator=useNavigate();
  const navRef = useRef(null);
  const navLogoRef = useRef(null);
  const navItemsRef = useRef(null);
  const navButtonRef = useRef(null);

  useEffect(() => {
    const navItems = navRef.current.querySelector("ul"); // Select all `li` elements

    const tl = gsap.timeline();
    tl.fromTo(
     navRef.current,
     {opacity:0.8,z:50, transformPerspective: 1500 },
     {opacity:1,z:0,duration:2,ease:"power4.out"}
    ).fromTo(
      navLogoRef.current,
      { opacity: 0, z: 50, transformPerspective: 1500 },
      { opacity: 1, z: 0, duration: 3, ease: "power2.out" },
      0
    )
      .fromTo(
        navItems,
        { opacity: 0, z: 50, transformPerspective: 1500 },
        { opacity: 1, z: 0, duration:2, ease: "power2.out" },
        0 // Start at the same time as previous animation
      )
      .fromTo(
        navButtonRef.current,
        { opacity: 0, z: 50, transformPerspective: 1500 },
        { opacity: 1, z: 0, duration: 3, ease: "power2.out" },
        0 // Start at the same time as previous animations
      );
  }, []);

  return (
    <nav
      ref={navRef}
      className="flex justify-between w-full items-center px-8 py-4  text-white bg-[#030b09] fixed top-0 z-40"
    >
      <div ref={navLogoRef}>
        <span className="md:text-2xl text-xl font-bold text-[rgb(5,150,105)]">Geo</span>
        <span className="md:text-[15px] text-[13px]">Scope</span>
      </div>
      <div className="md:block hidden">
        <ul
          ref={navItemsRef}
          className="relative z-auto flex space-x-6 text-sm border-[2px] rounded-xl shadow-inner border-[#041b14] py-3 px-7"
        >
          <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_15px_1px_rgba(5,150,105,0.3)]"></div>
          <li className="cursor-pointer text-base hover:text-[#083124]">Overview</li>
          <li className="cursor-pointer text-base">Technology</li>
          <li className="cursor-pointer text-base">Testimonials</li>
          <li className="cursor-pointer text-base">Resources</li>
        </ul>
      </div>
      <div ref={navButtonRef} className="flex items-center gap-6">
        <button onClick={()=>{navigator("/homeScreen")}} className="md:px-4 px-2 md:py-2 py-1 md:text-base text-xs bg-[#083124] font-medium text-[#cbdbd6] rounded-md hover:bg-[#0b3e2f]">
          Let's Try
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
