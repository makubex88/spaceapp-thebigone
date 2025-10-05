import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker } from "react-leaflet";
import type { LatLngExpression, Icon, LatLng } from "leaflet";

import React from "react";
import MapLegend from "./MapLegend";
import landDeformation from "../data/landDeformation.json";
import MiniMapOverlay from "./MiniMapOverlay";

const HazardMap: React.FC = () => {
  // Example fault line coordinates (Rizal area)
  const valleyFault: LatLngExpression[] = [
    [14.7, 121.1], // San Mateo
    [14.6, 121.2], // Antipolo
    [14.5, 121.25], // Tanay
  ];

  // Example marker for reference (Antipolo City)
  const antipolo: LatLngExpression = [14.6255, 121.1245];

  type LandChangeFeature = {
    id: string;
    nearest_fault: string;
    change_type: "uplift" | "subsidence" | "landslide";
    deformation_mm: number;
    amplitude: number;
    phase_shift_radians: number;
    distance_to_fault_km: number;
    data_source: string;
    geometry: {
      type: string,
      coordinates: LatLng ;
    }
  };

  // Map GeoJSON features to LandChangeFeature[]
  const landChangeFeatures =
    landDeformation.features?.map((feature: any) => ({
      id: feature.properties.id,
      nearest_fault: feature.properties.nearest_fault,
      change_type: feature.properties.change_type,
      deformation_mm: feature.properties.deformation_mm,
      amplitude: feature.properties.amplitude,
      phase_shift_radians: feature.properties.phase_shift_radians,
      distance_to_fault_km: feature.properties.distance_to_fault_km,
      data_source: feature.properties.data_source,
      geometry: {
        type: feature.geometry.type,
        coordinates: feature.geometry?.coordinates ?? [0, 0],
      },
    })).slice(0, 100) ?? [];

  const getColorByChangeType = (type: LandChangeFeature["change_type"]) => {
  switch (type) {
    case "uplift":
      return "green";
    case "subsidence":
      return "red";
    case "landslide":
      return "orange";
    default:
      return "orange";
  }
};

  return (
     <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side: Map takes half page */}
      <div style={{ flex: 1 }}></div>
      <div style={{ flex: -31, alignContent: "left" }}>
      
      <>
        <div style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          maxWidth: 900,
          margin: "auto",
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 10,
          background: "#f9f9f9"
        }}>

  <h2 style={{ textAlign: "center", color: "#b30000" }}>
    ⚠️ Through the Radar Looking Glass: The Valley Fault Story
  </h2>

  <p>
    In the satellite radar image, the <b>Valley Fault</b> runs as a red dashed scar across the metropolitan landscape. 
    At first glance, the city appears calm — roads, rivers, and neighborhoods continue their routines. 
    But through radar, we uncover hidden fingerprints of seismic forces shaping the ground.
  </p>

  <img
    src="df205493-af5c-466e-bd77-8d4417a45b7d.png"
    alt="Valley Fault Map"
    style={{
      width: "100%",
      border: "1px solid #aaa",
      borderRadius: "6px",
      margin: "15px 0"
    }}
  />

  <h3>🔍 What the Radar Reveals</h3>
  <ul>
    <li><b>Before the Event:</b> Urban areas return strong, consistent radar signals. Wetlands and calm waters appear dark and quiet.</li>
    <li><b>After the Big One:</b> Synthetic Aperture Radar (SAR) exposes the invisible scars:
      <ul>
        <li><span style={{ color: "#b30000" }}>InSAR fringes</span> show centimeter-level displacement.</li>
        <li><span style={{ color: "#b30000" }}>Coherence loss</span> points to shattered surfaces or flooded ground.</li>
        <li><span style={{ color: "#b30000" }}>Backscatter shifts</span> indicate liquefaction, landslides, or exposed rock.</li>
      </ul>
    </li>
  </ul>

  <h3>📊 Turning Data into Action</h3>
  <p>
    By blending <b>amplitude-based change detection</b>, <b>InSAR displacement maps</b>, and <b>coherence layers</b> with DEM 
    and population overlays, SAR transforms rupture into <i>actionable awareness</i>. These insights guide first responders, planners, and policymakers.
  </p>

  <h3>⚠️ The Looming Risk of the “Big One”</h3>
  <p>
    Seismologists warn that the Valley Fault system under Manila could unleash a <b>M7.2 earthquake</b>. 
    Such quakes recur every 200–400 years, with the last major rupture recorded in the 1600s. 
  </p>
  <p style={{ color: "#b30000", fontWeight: "bold" }}>
    Potential impact: 168,000 buildings could collapse, and more than 33,000 lives could be lost across Manila and neighboring provinces.
  </p>

  <h3>🚨 A Call for Preparedness</h3>
  <p>
    This is not just a geological story but a <b>human one</b>. 
    The radar doesn’t just capture deformation; it whispers a warning — a reminder to prepare for the inevitable. 
    Combining science, data visualization, and planning ensures that when the Big One comes, we’re ready to save lives.
  </p>
</div>

      
      </>
      

      </div>
      <MapContainer
          center={[14.6, 121.2]} // Rizal province center
          zoom={10}
          style={{ height: "100vh", width: "50%" }}
        >
          {/* OpenStreetMap Tiles */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fault line example */}
          <Polyline positions={valleyFault} color="red" weight={3} dashArray="5,10" />
            
        {landChangeFeatures.map((feature) => (
            <CircleMarker
              key={feature.id}
              center={feature.geometry.coordinates}
              radius={6}
              pathOptions={{ color: getColorByChangeType(feature.change_type), fillOpacity: 0.7 }}
            >
              <Popup>
                <div>
                  <strong>ID:</strong> {feature.id} <br />
                  <strong>Nearest Fault:</strong> {feature.nearest_fault} <br />
                  <strong>Change Type:</strong> {feature.change_type} <br />
                  <strong>Deformation (mm):</strong> {feature.deformation_mm} <br />
                  <strong>Distance to Fault (km):</strong> {feature.distance_to_fault_km} <br />
                  <strong>Amplitude:</strong> {feature.amplitude} <br />
                  <strong>Phase Shift (radians):</strong> {feature.phase_shift_radians} <br />
                  <strong>Data Source:</strong> {feature.data_source}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        {/* City Marker */}
        <Marker position={antipolo}>
          <Popup>City of Antipolo</Popup>
        </Marker>
        <MiniMapOverlay landChangeData={landChangeFeatures[0]} />
        <MapLegend /> {/* ✅ Legend added */}
      </MapContainer>
    </div>
  );
};

export default HazardMap;