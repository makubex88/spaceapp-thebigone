// LandChangeOverlay.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";

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
    coordinates: [number, number];
  }
};

type LandChangeOverlayProps = {
  data: LandChangeFeature[];
};

const getColorByChangeType = (type: LandChangeFeature["change_type"]) => {
  switch (type) {
    case "uplift":
      return "green";
    case "subsidence":
      return "red";
    case "landslide":
      return "orange";
    default:
      return "blue";
  }
};

const LandChangeOverlay: React.FC<LandChangeOverlayProps> = ({ data }) => {
  return (
    <MapContainer
      center={[38.5, 69.2]} // default center, can be adjusted dynamically
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((feature) => (
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
    </MapContainer>
  );
};

export default LandChangeOverlay;
