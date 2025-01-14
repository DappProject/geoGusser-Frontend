import React, { useEffect, useRef } from "react";
import landingPageImage from "../assets/landingPageImage.jpg";
import { GoDatabase } from "react-icons/go";
import { BsCpu } from "react-icons/bs";
import { IoMdFingerPrint } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);



function LandingPage() {
  const navigate = useNavigate()
  

  return (
    <>
      <div className="scroll-section relative min-h-screen bg-black text-white">
        {/* Navbar */}
        {/* <nav className="flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold">EQT LAB</div>
        <div className="flex items-center gap-6">
          <ul className="flex space-x-6 text-sm">
            <li className="cursor-pointer">Overview</li>
            <li className="cursor-pointer">Technology</li>
            <li className="cursor-pointer">Testimonials</li>
            <li className="cursor-pointer">Resources</li>
          </ul>
          <button className="px-4 py-2 text-sm bg-transparent border border-white rounded-md hover:bg-white hover:text-black">
            Log In
          </button>
          <button className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-gray-200">
            Get Started
          </button>
        </div>
      </nav> */}

        {/* Main Hero Section */}
        <section id="section1" className="min-h-[100vh] w-full flex flex-col justify-center items-center">
          <div className="h-[100vh] w-full relative flex flex-col items-center justify-center text-center px-4">
            {/* Background Glow */}
            <div className="h-full w-full absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-center">
              <img src={landingPageImage} className="w-full h-full"></img>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
              {/* <div className="flex justify-center">
                <div className="absolute -top-10 w-16 h-16 bg-black border-2 border-green-500 rounded-md flex items-center justify-center">
                  <span className="text-green-500 font-bold">EQT</span>
                </div>
              </div> */}
              <h1 id="heading" className="text-4xl md:text-7xl text-white/90 font-semibold mt-8">
                <span className="label">Verify</span> <span className="label"> to</span> <span className="label">Trust </span> <span className="label">AI</span>
              </h1>
              <div className="md:w-[50%] w-[90%] self-center">
                <p className="md:text-base text-xs mt-4">
                  <span className="para">Easily find a photo's location with GeoSpy, the AI-powered
                  tool for precise photo geolocation.</span><br/> <span className="para">Perfect for
                  investigations, OSINT, and discovering where photos were
                  taken.</span>
                </p>
              </div>
              <button id="button" className="mt-8 px-6 py-2 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-200 duration-200 text-nowrap" onClick={()=>navigate("/homeScreen")}>
                <span className="buttonText md:text-base text-sm">Try GeoScope</span>
              </button>
            </div>
          </div>
        </section>

        <section id="section2" className="min-h-[70vh]">
          <div className="bg-black text-white py-10 px-5">
            <h1 className="text-center text-2xl md:text-4xl font-semibold mb-10">
              Verifiable Compute{" "}
              <span className="text-emerald-400">Verifies</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center md:gap-0 gap-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="border border-emerald-500 bg-emerald-700/40 p-2 rounded-xl">
                  <GoDatabase className="md:text-5xl text-3xl text-emerald-600 " />
                </div>
                <p className="mt-4 text-sm md:text-base">
                  What data goes into <br /> an AI workflow
                </p>
              </div>
              {/* Arrow */}

              <div className="flex items-center justify-center">
                {/*Line */}
                <div className="h-[1px] w-36 bg-gradient-to-r from-black via-emerald-400/70 to-black relative md:mb-10 my-5"></div>

                {/* Diamond Shape */}
                <div className="absolute mx-2 md:mb-10">
                  <div className="w-5 h-5 bg-transparent border-2 border-emerald-400/70 transform rotate-45 rounded-sm"></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="border border-emerald-500 bg-emerald-700/40 p-2 rounded-xl">
                  <BsCpu className="md:text-5xl text-3xl text-emerald-600" />
                </div>
                <p className="mt-4 text-sm md:text-base">
                  What code is run and where <br /> it is executed
                </p>
              </div>
              {/* Arrow */}

              <div className="flex items-center justify-center">
                {/*  Line */}
                <div className="h-[1px] w-36 bg-gradient-to-r from-black via-emerald-400/70 to-black relative  md:mb-10 my-5"></div>

                {/* Diamond Shape */}
                <div className="absolute mx-2  md:mb-10 ">
                  <div className="w-5 h-5 bg-transparent border-2 border-emerald-400/70 transform rotate-45 rounded-sm"></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="border border-emerald-500 bg-emerald-700/40 p-2 rounded-xl">
                  <IoMdFingerPrint className="md:text-5xl text-3xl text-emerald-600" />
                </div>
                <p className="mt-4 text-sm md:text-base">
                  The output is genuine <br /> and secure
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="section3" className="min-h-[100vh] px-5 py-10 rounded-t-3xl bg-white flex flex-col items-center gap-12">
          <div className=" text-center flex flex-col items-center">
            {/* Label */}
            <button className="inline-block px-4 py-1 border border-green-800 text-green-800 hover:bg-emerald-600 hover:text-white duration-200 font-medium rounded-full mb-6">
              The Problem
            </button>

            {/* Heading */}
            <div className=" self-center">
              <h2 className="w-full text-3xl md:text-5xl font-semibold text-green-900">
                New AI workflows <br /> equal
                <span className="text-emerald-400"> New Threats</span>
              </h2>
            </div>

            {/* Description */}
            <p className="mt-4 text-emerald-600 leading-5 max-w-xl mx-auto">
              Paragraph of text on Compromising AI Supply Chains. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="xl:w-[80%] w-full min-h-[400px] flex md:flex-row flex-col items-center">
            <div className="bg-black w-1/2 h-full rounded-s-3xl"></div>
            <div className="bg-emerald-100 md:w-1/2 w-full h-full md:rounded-e-3xl md:rounded-es-none rounded-b-3xl lg:p-4 p-2">
              <div className="w-full h-full p-5 flex flex-col gap-6">
                <h1 className="text-3xl text-green-900 font-medium">
                  The Problem
                </h1>
                <div className="flex sm:flex-row flex-col justify-between text-green-900">
                  <div className="space-y-5 text-[13.5px] font-semibold">
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Inserting Backdoors in Ai Models
                    </h1>
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Extraction of AI Models and Data
                    </h1>
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Jailbreaks
                    </h1>
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Model DoS Attacks
                    </h1>
                    <div>
                      <h1 className="flex items-center">
                        <FaChevronRight />
                        &nbsp; FinOps Attacks
                      </h1>
                      <p className="text-xs text-emerald-500 ms-3">
                        (slowing performance, exhuasting token budgets)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-5 text-[13.5px] font-semibold ">
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Hallucination
                    </h1>
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Bias and Discrimination
                    </h1>
                    <h1 className="flex items-start">
                      <FaChevronRight className="mt-1" />
                      &nbsp; Toxicity, Aggression and Disinformation
                    </h1>
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Social Engineering
                    </h1>
                    <h1 className="flex items-center">
                      <FaChevronRight />
                      &nbsp; Misalignment
                    </h1>
                  </div>
                </div>
                <button className="w-40 px-5 py-2 text-sm rounded-lg bg-green-900 hover:bg-emerald-950 duration-200 flex items-center justify-between">
                  View Solutions <IoIosArrowDown className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="section4" className="min-h-[100vh] bg-white flex flex-col justify-center items-center space-y-10">
          <div className=" text-center flex flex-col items-center">
            {/* Label */}
            <button className="inline-block px-4 py-1 border border-green-800 text-green-800 hover:bg-emerald-600 hover:text-white  duration-200 font-medium rounded-full mb-6">
              Solutions
            </button>

            {/* Heading */}
            <div className=" self-center">
              <h2 className="w-full text-3xl md:text-5xl font-semibold text-green-900">
                Evalving trust for
                <br />
                <span className="text-emerald-400"> AI with</span>
              </h2>
            </div>
          </div>
          <div className="w-full min-h-[350px] md:py-0 py-5 bg-emerald-900 flex md:flex-row flex-col items-center justify-center md:gap-16 gap-5">
            <h1 className="md:text-5xl text-3xl text-green-400">Verifiable</h1>
            <h1 className="text-4xl font-thin text-emerald-500 md:block hidden">|</h1>
            <h1 className="text-4xl font-thin text-emerald-500 md:hidden block">—</h1>
            <div>
              <div className="flex flex-col gap-10">
                <div>
                  <h1 className="text-green-400 md:text-[28px] text-base">AI Trining and Inference</h1>
                  <p className="text-gray-300 md:text-base text-xs " >Proof AI deployments are untampered</p>
                </div>

                <div>
                  <h1 className="text-green-400 md:text-[28px] text-base">AI Privacy</h1>
                  <p className="text-gray-300 md:text-base text-xs ">Proof AI models and data are confidential</p>
                </div>

                <div>
                <h1 className="text-green-400 md:text-[28px] text-base">AI Safeguards</h1>
                <p className="text-gray-300 md:text-base text-xs ">Proof AI gourdrails are implemented</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
      </div>
    </>
  );
}

export default LandingPage;
