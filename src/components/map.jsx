import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import axios from "axios";
import { FaRegMap } from "react-icons/fa";
import { MdOutlineStreetview } from "react-icons/md";
import { Box, CircularProgress } from "@mui/material";

const Map = () => {
  const location = useLocation();

  const [isToggled, setIsToggled] = useState(false);

  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState(
    location.state?.streetViewUrl || ""
  );
  const [mapsUrl, setMapsUrl] = useState(location.state?.mapsUrl || "");
  const [imageLocation, setlImageLocation] = useState(
    location.state?.location || ""
  );
  const [country, setCountry] = useState(location.state?.country || "");
  const [latitude, setLatitude] = useState(location.state?.latitude || "");
  const [longitude, setLongitude] = useState(location.state?.longitude || "");
  const [file, setfile] = useState(location.state?.imageUrl || "");

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    const files = e.dataTransfer.files;
    console.log(files); // Handle files as needed
    uploadFiles(files);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file", file));
    console.log(files);
    try {
      const response = await axios.post(
        "http://45.154.98.112:8000/api/v1/geoGuess/search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const {
        mapsUrl,
        streetViewUrl,
        latitude,
        longitude,
        location,
        filePath,
      } = response.data;
      console.log(response.data);
      const imageUrl = `http://45.154.98.112:8000/public/${filePath.filename}`;
      setStreetViewUrl(streetViewUrl);
      setMapsUrl(mapsUrl);
      setlImageLocation(location);
      setCountry(country);
      setLatitude(latitude);
      setLongitude(longitude);
      setfile(imageUrl);
      console.log(imageUrl);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center h-full w-full">
      <div className="absolute sm:left-0 top-0 z-10 m-3 rounded-xl sm:h-[90%] sm:w-80 w-[90%] md:self-auto self-center bg-[#ffffff]">
        <form>
          <div
            className={`flex items-center justify-center rounded-xl py-2 border bg-white shadow-md cursor-pointer m-2 ${highlight ? "outline outline-blue-400": "outline-none"}`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {loading ? (
              <div className="">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <CircularProgress size="15px" color="black" />
                  <h1 className="text-sm">Proccessing...</h1>
                </Box>
              </div>
            ) : (
              <>
                <label
                  htmlFor="fileInput"
                  className="text-gray-700 text-sm hover:underline flex items-center gap-2"
                >
                  <IoReload className="text-xl" /> New Search
                </label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden w-full"
                  onChange={handleFileChange}
                  multiple
                />
              </>
            )}
          </div>
        </form>
        <div className="h-64 m-5 sm:block hidden">
          <img src={file} alt="image" className="h-full w-full rounded-xl " />
        </div>
        <div className="p-3 rounded-xl w-full">
          <div className="bg-white p-2 sm:block hidden">
            <h1 className="text-lg font-semibold text-gray-500">Location:</h1>
            <h1 className="text-lg font-semibold">{imageLocation || "N/A"}</h1>
          </div>
          <div className="bg-white mt-7 p-2">
            <h1 className="text-lg font-semibold text-gray-500">Latitude:</h1>
            <h1 className="font-semibold">{latitude || "N/A"}</h1>
            <h1 className="text-lg font-semibold text-gray-500">Longitude:</h1>
            <h1 className="font-semibold">{longitude || "N/A"}</h1>
          </div>
        </div>
      </div>

      {mapsUrl && (
        <div className="h-[100vh] w-full relative">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${"AIzaSyCITJsGKWFtOhyCmurW0ZmftmMTxHvPVz0"}&q=${mapsUrl}`}
            title="Google Maps"
            className="border w-[100vw] h-[100%]"
            allowFullScreen
            sandbox="allow-scripts allow-popups"
          ></iframe>
        </div>
      )}
      {streetViewUrl && (
        <div className={`mb-4 md:block`}>
          <iframe
            src={`https://www.google.com/maps/embed/v1/streetview?key=${"AIzaSyCITJsGKWFtOhyCmurW0ZmftmMTxHvPVz0"}&location=${streetViewUrl}&heading=${90}&pitch=${10}&fov=${80}`}
            title="Map View"
            // width="600"
            // height="400"
            className={`border-4 border-white absolute right-0 top-0 z-10 h-full md:w-[45%] block w-[100vw] ${
              isToggled && "hidden"
            }`}
            sandbox="allow-scripts allow-popups"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div
        className="z-20 absolute bottom-10 sm:right-5 left-7  self-center md:hidden flex items-center justify-between w-56 bg-black/80 text-white rounded-xl px-4 py-2 shadow-lg"
        onClick={handleToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700">
            {!isToggled ? <MdOutlineStreetview /> : <FaRegMap />}
          </div>
          {!isToggled ? (
            <div>
              <h1 className="text-base font-semibold">Street View</h1>
              <p className="text-sm text-gray-300">Show Perspective</p>
            </div>
          ) : (
            <div>
              <h1 className="text-base font-semibold">Map View</h1>
              <p className="text-sm text-gray-300">Show Location</p>
            </div>
          )}
        </div>
        <div>
          <button
            className={`w-5 h-2 flex p-[2px] items-center rounded-full transition-colors outline outline-gray-500`}
          >
            <div
              className={`w-1 h-1 bg-white rounded-full shadow-md transform transition-transform ${
                !isToggled ? "translate-x-3" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
