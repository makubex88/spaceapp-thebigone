// mockInferredFaults.ts
const inferredFaults = {
  type: "FeatureCollection",
  name: "Synthetic_Faults_SAR",
  crs: {
    type: "name",
    properties: { name: "EPSG:4326" },
  },
  features: [
    {
      type: "Feature",
      properties: {
        id: "fault_001",
        name: "Inferred Fault A",
        deformation_type: "strike-slip",
        slip_rate_mm_yr: 12.4,
        locking_depth_km: 8.5,
        amplitude: 0.72,
        phase_shift_radians: 1.14,
        data_source: "Synthetic InSAR",
        status: "active",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.20, 14.75],
          [121.22, 14.68],
          [121.25, 14.60],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "fault_002",
        name: "Buried Fault B",
        deformation_type: "reverse",
        slip_rate_mm_yr: 5.7,
        locking_depth_km: 12.0,
        amplitude: 0.55,
        phase_shift_radians: 0.87,
        data_source: "Synthetic InSAR",
        status: "inferred",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.18, 14.72],
          [121.19, 14.66],
          [121.21, 14.58],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "fault_003",
        name: "Urban Fault Segment C",
        deformation_type: "normal",
        slip_rate_mm_yr: 2.9,
        locking_depth_km: 6.2,
        amplitude: 0.61,
        phase_shift_radians: 0.95,
        data_source: "Synthetic PSI (Persistent Scatterer)",
        status: "active",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.23, 14.70],
          [121.24, 14.64],
          [121.26, 14.56],
        ],
      },
    },
  ],
};

export default inferredFaults;
