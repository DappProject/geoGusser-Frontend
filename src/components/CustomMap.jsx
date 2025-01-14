import React, { useEffect, useRef } from "react";

const CustomMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.0060 }, // Sacramento coordinates
      zoom: 12,
      styles: [
        {
            elementType: "geometry",
            stylers: [{ color: "#212121" }], // General dark background
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#212121" }], // Dark label background
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }], // Muted label text color
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }], // Dark road style
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }], // Dark road stroke
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [{ visibility: "off" }], // Removes road labels
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#0f172a" }], // Dark water style
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [{ visibility: "on" }], // Removes water labels
          },
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }], // Hides points of interest
          },
          {
            featureType: "transit",
            stylers: [{ visibility: "off" }], // Hides transit features
          },
          {
            featureType: "administrative",
            stylers: [{ visibility: "on" }], // Hides administrative boundaries
          },
      ], // Example dark theme
    });
  }, []);

  return <div ref={mapRef} className="h-[100vh] w-full relative" />;
};

export default CustomMap;
