import React, { useState } from "react";
import img from "../assets/img5.jpg";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import sampleImage1 from "../assets/sampleImage1.jpeg"
import sampleImage2 from "../assets/sampleImage2.jpg"
import sampleImage3 from "../assets/sampleImage3.jpg"

function HomeScreen() {
  const [highlight, setHighlight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true)
  const [showSampleModal, setShowSampleModal]=useState(false)

  const navigate = useNavigate();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);

    const files = Array.from(e.dataTransfer.files); // Convert FileList to Array
    if (files.length) {
      console.log("Dropped files:", files);
      uploadFiles(files);
    }
  };

  const handleFileChange = async (fileOrUrl) => {
    console.log(fileOrUrl)
    try {
      let file;
      if (typeof fileOrUrl === "string") {
        const response = await fetch(fileOrUrl);
        console.log(response) 
        const blob = await response.blob(); 
        file = new File([blob], "sampleImage.jpg", { type: blob.type }); 
      } else {
        file = fileOrUrl[0];
      }
      console.log(file)
      uploadFiles(file); 
      
    } catch (error) {
      console.error("Error processing the file:", error);
    }

  };

  const uploadFiles = async (files) => {
    setLoading(true);
    const formData = new FormData();
    // If `file` is a single object, directly append it
    if (files instanceof File) {
      formData.append("file", files);
    } else if (Array.isArray(files)) {
      // If `file` is an array, iterate and append each file
      files.forEach((f) => formData.append("file", f));
    } else {
      console.error("Invalid file format");
      setLoading(false);
      return;
    }
    try {

      const response = await axios.post("http://45.154.98.112:8000/api/v1/geoGuess/search", formData, {

        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setLoading(false);
        const { mapsUrl, streetViewUrl, latitude, longitude, city, location } =
          response.data;

        const imageUrl = `http://45.154.98.112:8000/public/${response.data.filePath.filename}`;

        console.log(imageUrl);
        navigate("/map", {
          state: {
            streetViewUrl,
            mapsUrl,
            imageUrl,
            latitude,
            longitude,
            location,
          },
        });
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-black ">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover cursor-pointer relative opacity-80"
          draggable="false"
        />

        <div className={`absolute z-20 inset-0 items-center justify-center bg-black bg-opacity-30 ${showModal ? "flex" : "hidden"}`}>
          <div className="bg-white rounded-lg shadow-lg p-6 sm:w-96 w-64 sm:h-96">
            <h1 className="text-2xl font-semibold text-center mb-4">
              <span className="text-blue-600">Geo</span>Scope
            </h1>
            <h2 className="text-lg font-medium text-gray-700 text-center mb-4">
              Welcome to GeoScope
            </h2>
            <p className="sm:text-sm text-xs text-gray-600 text-center mb-6">
              Discover the power of our cutting-edge AI model for pinpointing street-level photo geolocation. This demo highlights San Francisco, but Geoscope innovative technology is adaptable to any city across the globe.
            </p>
            <div className="space-y-3">
              <button className="w-full sm:py-2 py-1 sm:px-4 px-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg shadow-md sm:text-base text-sm" onClick={()=>{ setShowSampleModal(true)}}>
                📸 Try Example Images
              </button>
              <button className="w-full sm:py-2 py-1 sm:px-4 px-2 sm:text-base text-sm bg-black text-white rounded-lg shadow-md hover:bg-gray-900" onClick={()=>setShowModal(false)}>
                Try GeoScope →
              </button>
            </div>
          </div>
        </div>

        <div className={`absolute z-20 inset-0 flex items-center justify-center bg-black bg-opacity-30 ${showSampleModal? "flex" : "hidden"}`}>
        <div className="bg-white rounded-lg shadow-lg sm:p-6 p-2 m-1 sm:w-[50rem] w-[40rem]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="sm:text-xl text-sm font-medium text-gray-700">
              Try Example Images
            </h2>
            <button
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close"
              onClick={()=>setShowSampleModal(false)}
            >
              ✕
            </button>
          </div>
          <p className="sm:text-sm text-xs text-gray-600 text-center mb-6">
            Click any example to see how Street Search works with different
            types of images
          </p>
          <div className="flex sm:gap-4 gap-1">
            {/* High Context Example */}
            <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-xl sm:w-1/3 w-1/2 cursor-pointer" onClick={()=>{setShowSampleModal(false); setShowModal(false); handleFileChange(sampleImage1)}}> 
              <img
                src={sampleImage1}
                alt="High Context Example"
                className="rounded-t-md msm:b-3 mb-1 sm:h-48 h-[110px] w-full"
                draggable="false"
              />
              <div className="p-2">
                <h3 className=" sm:text-sm text-xs font-semibold text-gray-800 sm:mb-2 mb-1 sm:text-center">
                  🏛 High Context Example
                </h3>
                <p className="sm:text-sm text-[11px] leading-3 tracking-tight text-gray-600">
                  Clear view of buildings, streets, and landmarks - ideal for
                  accurate location matching
                </p>
              </div>
              
            </div>

            {/* Low Context Example */}
            <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-xl sm:w-1/3 w-1/2 cursor-pointer" onClick={()=>{setShowSampleModal(false); setShowModal(false); handleFileChange(sampleImage2)}}>
              <img
                src={sampleImage2}
                alt="Low Context Example"
                className="rounded-t-md sm:mb-3 mb-1 sm:h-48 h-[110px] w-full"
                draggable="false"
              />
              <div className="p-2">

              <h3 className="sm:text-sm text-xs font-semibold text-gray-800 sm:mb-2 mb-1 sm:text-center">
                🔍 Low Context Example
              </h3>
              <p className="sm:text-sm text-[11px] leading-3 tracking-tight text-gray-600">
                Limited architectural features but still contains recognizable
                elements
              </p>
              </div>
            </div>

            {/* Night Scene Example */}
            <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-xl sm:w-1/3 w-1/2  cursor-pointer" onClick={()=>{setShowSampleModal(false); setShowModal(false); handleFileChange(sampleImage3)}} >
              <img
                src={sampleImage3}
                alt="Night Scene Example"
                className="rounded-t-md sm:mb-3 mb-1 sm:h-48 h-[110px] w-full"
                draggable="false"
              />
              <div className="p-2">

              <h3 className="sm:text-sm text-xs font-semibold text-gray-800 sm:mb-2 mb-1 sm:text-center">
                🌙 Night Scene Example
              </h3>
              <p className="sm:text-sm text-[11px] leading-3 tracking-tight text-gray-600">
                Night time image showing how lighting conditions affect
                recognition
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {loading ? (
          <div className="absolute sm:top-[45%] top-[45%] sm:left-[44%] left-[26%] flex items-center justify-center rounded-full sm:p-4 p-2 bg-white shadow-md cursor-pointer">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <CircularProgress size="30px" color="black" />
              <h1>Proccessing...</h1>
            </Box>
          </div>
        ) : (
          <form action="" className="absolute z-10 sm:top-[50%] top-[45%] sm:left-[40%] left-[10%]">
            {/* <input type="file" name="file" id="" placeholder='Tap, or Drag & drop outdoor images' className=''/> */}

            <div
              className={`flex items-center justify-center border ${highlight ? "outline outline-blue-400": "outline-none"} rounded-full py-4 sm:px-8 px-4 bg-white shadow-md cursor-pointer`}
              onDragEnter={handleDragEnter}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label
                htmlFor="fileInput"
                className="text-gray-700 text-sm hover:underline"
              >
                Tap, or Drag & drop outdoor image
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e)=>{  handleFileChange(e.target.files)}}
                multiple
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default HomeScreen;
