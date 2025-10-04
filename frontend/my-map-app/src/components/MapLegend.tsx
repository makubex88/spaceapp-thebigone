import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapLegend: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // ✅ Use L.Control.extend to create a proper legend control
    const LegendControl = L.Control.extend({
      options: { position: "topright" },
      onAdd: function () {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = `
          <h4>Legend</h4>
          <div><span style="background: red; width:20px; height:3px; display:inline-block; margin-right:6px;"></span> Active Fault</div>
          <div><span style="background: orange; width:10px; height:10px; border-radius:50%; display:inline-block; margin-right:6px;"></span> Change Landscape</div>
        `;
        return div;
      },
    });
 
    const legend = new LegendControl();
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

export default MapLegend;
