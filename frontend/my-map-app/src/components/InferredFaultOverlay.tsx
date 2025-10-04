// components/InferredFaultOverlay.tsx
import React from "react";
import { Polyline, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import inferredFaults from "../data/mockInferredFaults.ts";

const statusColors: Record<string, string> = {
  active: "red",
  inferred: "orange",
};

const InferredFaultOverlay: React.FC = () => {
  return (
    <>
      {inferredFaults.features.map((fault) => { 
        const coords: LatLngExpression[] = fault.geometry.coordinates.map(
          (c) => [c[1], c[0]] // [lat, lng]
        );

        return (
          <Polyline
            key={fault.properties.id}
            positions={coords}
            color={statusColors[fault.properties.status] || "gray"}
            weight={4}
            opacity={fault.properties.status === "inferred" ? 0.5 : 0.9}
            dashArray={fault.properties.status === "inferred" ? "6 6" : ""}
          >
            <Popup>
              <strong>{fault.properties.name}</strong>
              <br />
              Type: {fault.properties.deformation_type}
              <br />
              Slip Rate: {fault.properties.slip_rate_mm_yr} mm/yr
              <br />
              Locking Depth: {fault.properties.locking_depth_km} km
              <br />
              Amplitude: {fault.properties.amplitude}
              <br />
              Phase Shift: {fault.properties.phase_shift_radians}
              <br />
              Data: {fault.properties.data_source}
              <br />
              Status: {fault.properties.status}
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
};

export default InferredFaultOverlay;
