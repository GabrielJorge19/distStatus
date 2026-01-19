import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import geoJsonDistricts from "./dadosDosDistritos";
import getData from "./data";

export const STATUS_COLORS = {
  CRITICO: "#8b0000",
  ATENCAO: "#ff8c00",
  REGULAR: "#ffd700",
  BOM: "#2e8b57",
  SEM_DADO: "#e0e0e0",
};

const distritos: any = {
    type: "FeatureCollection",
    name: "bairros",
    crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: geoJsonDistricts,
};


function normalizarDistrito(valor: string): string {
    return valor
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toUpperCase();
}



function getColor(valor?: number) {
  if (typeof valor !== "number" || isNaN(valor)) {
    return STATUS_COLORS.SEM_DADO;
  }

  if (valor < 40) {
    return STATUS_COLORS.CRITICO;
  }

  if (valor < 60) {
    return STATUS_COLORS.ATENCAO;
  }

  if (valor < 80) {
    return STATUS_COLORS.REGULAR;
  }

  return STATUS_COLORS.BOM;
}



export default function Distritos() {
    const [distData, setDistData] = useState<Record<string, number>>({});

    useEffect(() => {
        getData().then((result) => {
            setDistData(result ?? {});
        });
    }, []);


    const geoJsonStyle = (feature: any) => {
        const nomeOriginal = feature.properties.NOME_DIST;
        const distrito = normalizarDistrito(nomeOriginal);
        const percentual = distData[distrito];

        return {
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(percentual),
        };
    };


    function handleHover(e: any) {
        e.target.setStyle({
            fillOpacity: 1,
            weight: 3,
            color: "#ccc",
        });
        e.target.bringToFront();
    }

    function handleMouseOut(e: any) {
        e.target.setStyle(geoJsonStyle(e.target.feature));
    }

    function handleClick(e: any) {
        const layer = e.target;
        const feature = layer.feature;

        const popupContent = criarPopup(feature, distData);

        layer
            .bindPopup(popupContent, {
                closeButton: true,
                autoClose: true,
                className: "district-popup",
            })
            .openPopup();
    }


    const onEachFeature = (_feature: any, layer: any) => {
        layer.on({
            mouseover: handleHover,
            mouseout: handleMouseOut,
            click: handleClick,
            contextmenu: () => { },
        });
    };


    if (!Object.keys(distData).length) return null;

    return (
        <GeoJSON
            data={distritos}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
        />
    );
}


function criarPopup(feature: any, distData: Record<string, number>) {
    const nomeOriginal = feature.properties.NOME_DIST;
    const distrito = normalizarDistrito(nomeOriginal);
    const valor = distData[distrito];

    return `
    <div style="min-width: 180px">
      <strong>${nomeOriginal}</strong><br />
      ${typeof valor === "number"
            ? `Hidrantes operacionais: <b>${valor.toFixed(2)}%</b>`
            : `<span style="color:#999">Sem dados</span>`
        }
    </div>
  `;
}


