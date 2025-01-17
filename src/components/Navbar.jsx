import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Navbar = ({ scrollToSection, refs }) => {
  const { overviewRef, technologyRef, testimonialsRef, resourcesRef } = refs;

  const navigator=useNavigate();
  const navRef = useRef(null);
  const navLogoRef = useRef(null);
  const navItemsRef = useRef(null);
  const navButtonRef = useRef(null);

  useEffect(() => {
    const navItems = navRef.current.querySelector("ul");

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
        0 
      )
      .fromTo(
        navButtonRef.current,
        { opacity: 0, z: 50, transformPerspective: 1500 },
        { opacity: 1, z: 0, duration: 3, ease: "power2.out" },
        0 
      );
  }, []);

  return (
    <nav
      ref={navRef}
      className="flex justify-between w-[100vw] items-center px-8 py-4  text-white bg-[#030b09] fixed top-0 z-20"
    >
      <div ref={navLogoRef}>
        <span className="md:text-2xl text-xl font-bold text-[rgb(5,150,105)]">Geo</span>
        <span className="md:text-[15px] text-[13px]">Scope</span>
      </div>
      <div className="md:block hidden">
        <ul
          ref={navItemsRef}
          className="relative z-50 flex text-sm border-[2px] rounded-xl shadow-inner border-[#041b14] py-3 px-7"
        >
          {/* <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_15px_1px_rgba(5,150,105,0.3)]"></div> */}
          <li onClick={(e) => {e.preventDefault(); scrollToSection(overviewRef)}} className=" text-base px-3 cursor-pointer hover:text-[#0E5A45] duration-150 ease-in-out">Overview</li>
          <li onClick={(e) => {e.preventDefault(); scrollToSection(technologyRef)}} className=" text-base px-3 cursor-pointer hover:text-[#0E5A45] duration-150 ease-in-out">Technology</li>
          <li onClick={(e) => {e.preventDefault(); scrollToSection(testimonialsRef)}} className=" text-base px-3 cursor-pointer hover:text-[#0E5A45] duration-150 ease-in-out ">Testimonials</li>
          <li  onClick={(e) => {e.preventDefault(); scrollToSection(resourcesRef)}} className=" text-base px-3 cursor-pointer hover:text-[#0E5A45] duration-150 ease-in-out">Resources</li>
        </ul>
      </div>
      <div ref={navButtonRef} className="items-center flex">
        <button onClick={()=>{navigator("/homeScreen")}} className="md:px-4 px-2 md:py-2 py-1 md:ms-0 md:text-base text-xs bg-[#083124] font-medium text-[#cbdbd6] rounded-md hover:bg-[#0b3e2f]">
          Let's Try
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
