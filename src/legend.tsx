import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./styles/legend.css";
import { Control } from 'leaflet';

export default function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = new Control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "map-legend");

      div.innerHTML = `
        <strong>Status dos Hidrantes</strong>
        <div><span class="color critical"></span> Crítico (&lt; 40%)</div>
        <div><span class="color warning"></span> Atenção (40–60%)</div>
        <div><span class="color regular"></span> Regular (60–80%)</div>
        <div><span class="color good"></span> Bom (≥ 80%)</div>
      `;

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}
