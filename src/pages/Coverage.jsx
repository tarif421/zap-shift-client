import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaSearch, FaMapMarkerAlt, FaCity } from "react-icons/fa";

// Leaflet default icon fix for React (optional bug prevention)
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultImage = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultImage;

const Coverage = () => {
  const serviceCenter = useLoaderData() || [];
  const [searchTerm, setSearchTerm] = useState("");
  const position = [23.685, 90.3563]; // Center of Bangladesh

  // Filter service centers based on search input (district or covered areas)
  const filteredCenters = serviceCenter.filter(
    (center) =>
      center.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.covered_area.some((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="bg-[#bbf7d0] text-[#003b36] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-sm">
          Nationwide Network
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#003b36] mt-3">
          Our Coverage Areas
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Zap Shift delivers to all 64 districts across Bangladesh with speed and reliability. Check our hubs and service zones below.
        </p>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-base-200/60 p-4 rounded-2xl border border-base-300 shadow-sm">
        <div className="flex items-center gap-2 text-[#003b36] font-bold text-sm md:text-base">
          <FaCity className="text-xl" />
          <span>Total Available Hubs: {serviceCenter.length} Districts</span>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search district or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-10 bg-base-100 border-base-300 focus:border-[#003b36] focus:outline-none text-sm rounded-xl"
          />
        </div>
      </div>

      {/* Map & List Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Searched Hubs List/Cards (1 Column on Large Screen) */}
        <div className="lg:col-span-1 bg-base-100 border border-base-200 rounded-2xl p-4 shadow-sm h-[600px] overflow-y-auto flex flex-col gap-3">
          <h3 className="font-bold text-[#003b36] text-lg border-b border-base-200 pb-2 sticky top-0 bg-base-100 z-10">
            Hub Locations ({filteredCenters.length})
          </h3>

          {filteredCenters.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              No service centers found matching your search!
            </div>
          ) : (
            filteredCenters.map((center, index) => (
              <div
                key={index}
                className="p-3.5 bg-base-200/50 hover:bg-[#bbf7d0]/20 border border-base-200 rounded-xl transition-all duration-200 cursor-pointer flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2 text-[#003b36] font-bold text-base">
                  <FaMapMarkerAlt className="text-sm text-error" />
                  <h4>{center.district}</h4>
                </div>
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-700">Covered Areas:</strong>{" "}
                  {center.covered_area.join(", ")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Leaflet Interactive Map (2 Columns on Large Screen) */}
        <div className="lg:col-span-2 border border-base-200 rounded-2xl overflow-hidden shadow-sm h-[600px]">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <div className="p-1">
                    <strong className="text-[#003b36] text-base font-bold">
                      {center.district} Hub
                    </strong>
                    <br />
                    <span className="text-xs text-gray-600">
                      <strong>Service Areas:</strong>{" "}
                      {center.covered_area.join(", ")}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;