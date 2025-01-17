import React, { useEffect, useRef, useState } from "react";
import landingPageImage from "../assets/landingPageImage.jpg";
import SolutionImage from "../assets/bgimage.gif";
import { GoDatabase } from "react-icons/go";
import { BsCpu } from "react-icons/bs";
import { IoMdFingerPrint } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useNavigate } from "react-router-dom";
import MouseCircle from "./MouseCircle";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  const overviewRef = useRef(null);
  const technologyRef = useRef(null);
  const testimonialsRef = useRef(null);
  const resourcesRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "end",});
  };


  useEffect(() => {

    const tl = gsap.timeline({ defaults: { transformStyle: "preserve-3d" } });

    tl.fromTo(
      headingRef.current,
      {
        opacity: 0.5,
        z: 450, 
        transformPerspective: 1500,
      },
      {
        opacity: 1,
        z: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.2
      }
    ).fromTo(
      paraRef.current,
      {
        opacity: 0,
        y: 50,
        z: 150,
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        y: 0, 
        z: 0, 
        duration: 2,
        ease: "power2.out",
      },
      "-=02"
    );
    
    buttonRef.current.addEventListener("mouseenter", () => {
      gsap.to(buttonRef.current, { scale: 1.2, duration: 0.2 });
    });

    buttonRef.current.addEventListener("mouseleave", () => {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
    });

    
  }, []);

  const handleButtonClick = () => {
    navigate("/homeScreen");
  };


  useEffect(() => {
    // Initialize Locomotive Scroll
    const scrollInstance = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      smoothMobile: true,
    });

    // Sync Locomotive Scroll with GSAP ScrollTrigger
    ScrollTrigger.scrollerProxy(containerRef.current, {
      scrollTop(value) {
        return arguments.length
          ? scrollInstance.scrollTo(value, 0, 0)
          : scrollInstance.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    // Cleanup on component unmount
  return () => {
    scrollInstance.destroy();
  };
  }, []);

  return (
    <>
      
      <Navbar scrollToSection={scrollToSection} refs={{ 
        overviewRef, 
        technologyRef, 
        testimonialsRef, 
        resourcesRef 
      }} />
      <MouseCircle/>

      <div ref={containerRef} className="scroll-container">
        <div className="scroll-section relative h-fit bg-black text-white">
          

          <section
          ref={overviewRef} 
            id="overview"
            className="min-h-[100vh] w-full flex flex-col justify-center items-center"
          >
            {/* Section content */}
            <div
              className="h-[100vh] w-full relative flex flex-col items-center justify-center text-center px-4"
              ref={backgroundRef}
            >
              {/* Background Glow */}
              <div className="h-full w-full absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-center">
                <img src={landingPageImage} className="w-full h-full opacity-40 object-cover" alt="Background" />
              </div>

              {/* Content */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <h1
                  id="heading"
                  ref={headingRef}
                  className=" lg:w-[950px] md:w-[700px] text-3xl md:text-5xl lg:text-7xl text-white/50 font-semibold mt-8"
                >
                  <span className="label">
                    Uncover <span
                      className="font-bold"
                      style={{
                        background: "linear-gradient(190deg, #ffffff, #059669)", // Gradient from white to #059669
                        
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      The True Location
                    </span> Behind Every Image
                  </span>
                </h1>
                <div className="md:w-[50%] w-[90%] self-center">
                  <p ref={paraRef} className="md:text-base text-xs mt-4">
                    <span className="para text-white/80">
                      Geoscope’s AI platform transforms images into precise location
                      insights. Using advanced image recognition, we extract
                      geospatial data to pinpoint exact locations, from landmarks to
                      hidden spots, enabling data-driven decisions. Every pixel
                      reveals a new world!
                    </span>
                  </p>
                </div>
                <button
                  id="button"
                  ref={buttonRef}
                  className="mt-8 md:px-6 px-4 md:py-2 py-1 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-200 duration-200 text-nowrap"
                  onClick={handleButtonClick}
                >
                  <span className="buttonText md:text-base text-sm">Try GeoScope</span>
                </button>
              </div>
            </div>
          </section>
          <section  ref={technologyRef} id="technology" className="scroll-mt-52 min-h-[70vh]">
            {/* Section content */}
            <div className="bg-black text-white py-10 px-5">
              <h1 className="text-center text-xl md:text-4xl font-semibold mb-10">
                A Cornerstone of Trust In {" "}
                <span className="text-emerald-400">AI Workflows</span>
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center md:gap-0 gap-3">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="border border-emerald-500 bg-emerald-700/40 p-2 rounded-xl">
                    <GoDatabase className="md:text-5xl text-3xl text-emerald-600 " />
                  </div>
                  <p className="mt-4 text-xs md:text-base">
                    Validating what data is integrated <br /> into every AI workflow.
                  </p>
                </div>
                {/* Arrow */}

                <div className="flex items-center justify-center">
                  {/*Line */}
                  <div className="h-[1px] w-36 bg-gradient-to-r from-black via-emerald-400/70 to-black relative md:mb-10 my-5"></div>

                  {/* Diamond Shape */}
                  <div className="absolute mx-2 md:mb-5">
                    <div className="w-5 h-5 bg-transparent border-2 border-emerald-400/70 transform rotate-45 rounded-sm"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="border border-emerald-500 bg-emerald-700/40 p-2 rounded-xl">
                    <BsCpu className="md:text-5xl text-3xl text-emerald-600" />
                  </div>
                  <p className="mt-4 text-xs md:text-base ">
                    Guaranteeing the accuracy of the code <br /> run and its execution environment
                  </p>
                </div>
                {/* Arrow */}

                <div className="flex items-center justify-center">
                  {/*  Line */}
                  <div className="h-[1px] w-36 bg-gradient-to-r from-black via-emerald-400/70 to-black relative  md:mb-10 my-5"></div>

                  {/* Diamond Shape */}
                  <div className="absolute mx-2  md:mb-5 ">
                    <div className="w-5 h-5 bg-transparent border-2 border-emerald-400/70 transform rotate-45 rounded-sm"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="border border-emerald-500 bg-emerald-700/40 p-2 rounded-xl">
                    <IoMdFingerPrint className="md:text-5xl text-3xl text-emerald-600" />
                  </div>
                  <p className="mt-4 text-xs md:text-base">
                    Delivering outputs that are not only  genuine but <br /> safeguarded against tampering.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section ref={testimonialsRef} id="testimonials" className="min-h-[100vh] px-5 py-10 rounded-t-3xl bg-white flex flex-col items-center gap-12">
            {/* Section content */}
            <div className=" text-center flex flex-col items-center">
              {/* Label */}
              <button className="inline-block px-4 py-1 border border-green-800 text-green-800 hover:bg-emerald-600 hover:text-white duration-200 sm:text-base text-xs font-bold rounded-full mb-6">
                The Solution
              </button>

              {/* Heading */}
              <div className=" self-center">
                <h2 className="w-full text-2xl md:text-5xl  font-semibold text-green-900">
                  Discover Hidden Insights {" "} <br />
                  <span className="text-emerald-400">with Geoscope</span>
                </h2>
              </div>

              {/* Description */}
              <p className="mt-4 text-emerald-600 sm:text-base text-xs leading-5 max-w-xl mx-auto">
                Unlock the story behind every image. Geoscope harnesses the power of advanced image analysis and geolocation technology to generate detailed reports and accurately predict the location of any image.
              </p>
            </div>
            <div className="xl:w-[80%] w-full md:h-[500px] h-auto  flex  md:flex-row flex-col items-center">
              <div className="bg-black md:w-1/2 w-full md:h-[500px] h-[300px] overflow-hidden md:rounded-s-3xl md:rounded-t-none rounded-t-3xl">
                <img src={SolutionImage} className="w-full h-full opacity-40 object-cover" alt="Background" />
              </div>
              <div className="bg-emerald-200 md:w-1/2 w-full h-full md:rounded-e-3xl md:rounded-es-none rounded-b-3xl lg:p-4 p-2">
                <div className="w-full h-full sm:p-5 p-3 flex flex-col sm:gap-6 md:gap-3 gap-2">
                  <h1 className="sm:text-3xl text-2xl text-green-900 font-medium">
                    The Solution
                  </h1>
                  <div className="flex sm:flex-row flex-col justify-between text-green-900">
                    <div className="space-y-5 text-[13.5px] font-semibold">
                      <div>

                        <h1 className="flex items-center sm:text-lg text-base">
                          <FaChevronRight />
                          &nbsp; Enhanced Accuracy
                        </h1>
                        <p className="text-xs text-emerald-500 ms-3">
                        Our AI models are trained with massive datasets and updated regularly to ensure high-precision location predictions, often at the meter level.
                        </p>
                      </div> <div>

                        <h1 className="flex items-center sm:text-lg text-base">
                          <FaChevronRight />
                          &nbsp; Robust Security
                        </h1>
                        <p className="text-xs text-emerald-500 ms-3">
                        With secure encryption and constant monitoring, Geoscope safeguards your data from unauthorized access and malicious exploitation
                        </p>
                      </div> 
                      <div>

                        <h1 className="flex items-center sm:text-lg text-base">
                          <FaChevronRight />
                          &nbsp; Efficient Resource Management
                        </h1>
                        <p className="text-xs text-emerald-500 ms-3">
                          With a streamlined interface and intuitive design, users of any expertise level can easily access and use Geoscope for their geolocation needs
                        </p>
                      </div>
                      <div>
                        <h1 className="flex items-center sm:text-lg text-base">
                          <FaChevronRight />
                          &nbsp; User-Centric Interface
                        </h1>
                        <p className="text-xs text-emerald-500 ms-3">
                          With a streamlined interface and intuitive design, users of any expertise level can easily access and use Geoscope for their geolocation needs
                        </p>
                      </div>
                    </div>

                  </div>
                  <button className="sm:w-40 w-32 sm:px-5 px-3 py-2 font-bold sm:text-sm text-xs rounded-lg bg-emerald-900 hover:bg-emerald-950 duration-200 flex items-center justify-between">
                    View Solutions <IoIosArrowDown className="sm:text-lg text-base" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        <section
        ref={resourcesRef}
          id="resources"
          className="h-auto py-10 flex flex-col bg-white justify-center items-center space-y-10 "
        >
          <div className=" text-center flex flex-col items-center">
            {/* Label */}
            <button className="inline-block px-4 py-1 border border-green-800 text-green-800 hover:bg-emerald-600 hover:text-white duration-200 sm:text-base text-xs font-bold rounded-full mb-6">
            Get Started
            </button>

            {/* Heading */}
            <div className=" self-center">
              <h2 className="w-full text-2xl md:text-5xl font-semibold text-green-900">
              Experience Geoscope 
                <br />
                <span className="text-emerald-400"> Today</span>
              </h2>
            </div>
          </div>
          <div className="w-full min-h-[350px] md:py-0 px-5 py-5 bg-emerald-900 flex md:flex-row flex-col items-center justify-center md:gap-16 gap-2">
            <h1 className="md:text-5xl text-2xl text-green-400">Ready to Explore? <br /> Let's Try Something New!</h1>
            <h1 className="text-4xl font-thin text-emerald-500 md:block hidden">
              |
            </h1>
            <h1 className="text-4xl font-thin text-emerald-500 md:hidden block">
              —
            </h1>
            <div className="py-3">
              <div className="flex flex-col md:gap-10 gap-5 md:ms-0 ms-2">
                <div>
                  <h1 className="text-green-400 md:text-[28px] text-base">
                  Upload Your Image
                  </h1>
                  <p className="text-gray-300 md:text-base text-xs ">
                  Upload any image to our platform and get instant, precise geolocation results.
                  </p>
                </div>

                <div>
                  <h1 className="text-green-400 md:text-[28px] text-base">
                  Analyze & Explore
                  </h1>
                  <p className="text-gray-300 md:text-base text-xs ">
                  Use our AI-powered insights for your business, research, or personal projects, <br /> and experience unmatched accuracy
                  </p>
                </div>

                <div>
                  <h1 className="text-green-400 md:text-[28px] text-base">
                  Contact Us for Custom Solutions
                  </h1>
                  <p className="text-gray-300 md:text-base text-xs ">
                  If you need tailored solutions for specific requirements, reach out to us for more <br /> information on custom packages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
