import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import axios from "axios";

const Map = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [streetViewUrl, setStreetViewUrl] = useState(location.state?.streetViewUrl || "");
  const [mapsUrl, setMapsUrl] = useState(location.state?.mapsUrl || "");
  const [imageLocation, setlImageLocation] = useState(location.state?.location || "");
  const [country, setCountry] = useState(location.state?.country || "");
  const [latitude, setLatitude] = useState(location.state?.latitude || "");
  const [longitude, setLongitude] = useState(location.state?.longitude || "");
  const [file ,setfile] = useState(location.state?.imageUrl || "")

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
    uploadFiles(files)
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file", file));
    console.log(files)
    try {
      const response = await axios.post("http://45.154.98.112:8000/api/v1/geoGuess/search", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const {  mapsUrl, streetViewUrl, latitude, longitude, location, filePath } = response.data;
      console.log(response.data)
      const imageUrl = `http://45.154.98.112:8000/public/${filePath.filename}`
      setStreetViewUrl(streetViewUrl);
      setMapsUrl(mapsUrl);
      setlImageLocation(location);
      setCountry(country);
      setLatitude(latitude);
      setLongitude(longitude);
      setfile(imageUrl)
      console.log(imageUrl)
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center h-full w-full">
      <div className="absolute left-0 top-0 z-10 m-3 rounded-xl h-[90%] w-80 bg-[#ffffff]">
        <form>
          <div
            className={`flex items-center justify-center rounded-xl py-2 border bg-white shadow-md cursor-pointer m-2`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
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
          </div>
        </form>
        <div className="h-64 m-5">
          <img src={file} alt="image" className="h-full w-full rounded-xl"/>
        </div>
        <div className="p-3 rounded-xl w-full">
          <div className="bg-white p-2">
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
        <div className="mb-4">
          <iframe
            src={`https://www.google.com/maps/embed/v1/streetview?key=${"AIzaSyCITJsGKWFtOhyCmurW0ZmftmMTxHvPVz0"}&location=${streetViewUrl}&heading=${90}&pitch=${10}&fov=${80}`}
            title="Map View"
            width="600"
            height="400"
            className="border-4 border-white absolute right-0 top-0 h-full"
            sandbox="allow-scripts allow-popups"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Map;
