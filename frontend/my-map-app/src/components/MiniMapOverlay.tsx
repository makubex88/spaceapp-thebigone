// components/MiniMapOverlay.tsx
import { MapContainer, TileLayer, GeoJSON, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { CircleMarker, LatLng, Popup, type LatLngExpression } from "leaflet";
import landDeformation from "../data/landDeformation.json";


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

  interface MiniMapOverlayProps {
  landChangeData: LandChangeFeature;
}

const MiniMapOverlay: React.FC<MiniMapOverlayProps> = ({ landChangeData }) => {
    const valleyFault: LatLngExpression[] = [
        [14.7, 121.1], // San Mateo
        [14.6, 121.2], // Antipolo
        [14.5, 121.25], // Tanay
      ];

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
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        width: "200px",
        height: "200px",
        border: "2px solid #555",
        borderRadius: "6px",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      <MapContainer
        center={[14.6, 121.2]}
        zoom={9}
        dragging={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         <Polyline positions={valleyFault} color="red" weight={3} dashArray="5,10" />

        



      </MapContainer>
    </div>
  );
};

export default MiniMapOverlay;
