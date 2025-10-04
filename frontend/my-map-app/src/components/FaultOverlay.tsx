// components/FaultOverlay.tsx
import React from "react";
import { Marker, Popup, Polyline } from "react-leaflet";
import type { LatLngExpression, Icon } from "leaflet";

// Mock data (normally you'd fetch this from an API)
const faultData = {
  features: [
    {
      id: "site-001",
      type: "paleoseismology_site",
      geometry: { type: "Point", coordinates: [121.1, 14.7] },
      properties: {
        name: "San Mateo Trench Site",
        dating_method: "14C",
        age_range: "1200–1400 CE",
        slip_rate: "10 ± 2 mm/yr",
        confidence: "High",
      },
    },
    {
      id: "trench-001",
      type: "confirmed_trench",
      geometry: { type: "Point", coordinates: [121.2, 14.6] },
      properties: {
        name: "Antipolo Confirmed Trench",
        dating_method: "OSL",
        age_range: "900–1100 CE",
        slip_rate: "8 ± 1 mm/yr",
        confidence: "High",
      },
    },
    {
      id: "fault-001",
      type: "inferred_fault",
      geometry: {
        type: "LineString",
        coordinates: [
          [121.1, 14.7],
          [121.2, 14.6],
          [121.25, 14.5],
        ],
      },
      properties: {
        name: "Valley Fault (Inferred Section)",
        evidence: "Geomorphic lineament, seismicity cluster",
        slip_sense: "Strike-slip",
        confidence: "Medium",
      },
    },
    {
      id: "fault-002",
      type: "hypothesized_fault_trace",
      geometry: {
        type: "LineString",
        coordinates: [
          [121.15, 14.55],
          [121.22, 14.48],
        ],
      },
      properties: {
        name: "Possible Secondary Fault",
        evidence: "SAR coherence anomaly, drainage offset",
        slip_sense: "Unknown",
        confidence: "Low",
      },
    },
  ],
};

// Map confidence → color
const confidenceColors: Record<string, string> = {
  Low: "red",
  Medium: "orange",
  High: "green",
};

const FaultOverlay: React.FC = () => {
  return (
    <>
      {faultData.features.map((feature) => {
        if (feature.geometry.type === "Point") {
          // Ensure coordinates is a number[]
          const pointCoords = feature.geometry.coordinates as number[];
          const coords: LatLngExpression = [
            pointCoords[1], // lat
            pointCoords[0], // lng
          ];

          return (
            <Marker key={feature.id} position={coords}>
              <Popup>
                <strong>{feature.properties.name}</strong>
                <br />
                Dating: {feature.properties.dating_method} (
                {feature.properties.age_range})
                <br />
                Slip rate: {feature.properties.slip_rate}
                <br />
                Confidence: {feature.properties.confidence}
              </Popup>
            </Marker>
          );
        }

        if (feature.geometry.type === "LineString") {
          const coords: LatLngExpression[] = feature.geometry.coordinates.map(
            (c) => [c[1], c[0]]
          );

          return (
            <Polyline
              key={feature.id}
              positions={coords}
              color={confidenceColors[feature.properties.confidence] || "gray"}
              weight={4}
            >
              <Popup>
                <strong>{feature.properties.name}</strong>
                <br />
                Evidence: {feature.properties.evidence}
                <br />
                Slip sense: {feature.properties.slip_sense}
                <br />
                Confidence: {feature.properties.confidence}
              </Popup>
            </Polyline>
          );
        }

        return null;
      })}
    </>
  );
};

export default FaultOverlay;
