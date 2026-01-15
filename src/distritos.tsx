import { GeoJSON } from "react-leaflet";
import geoJsonDistricts from "./dadosDosDistritos";
import getData from "./data";
import { useCallback, useEffect, useMemo, useState } from "react";


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


function getColor(valor?: number, minimo = 0) {
    if (typeof valor !== "number" || isNaN(valor)) {
        return "#e0e0e0"; // sem dado
    }

    // Limita intervalo válido
    const v = Math.min(Math.max(valor, 0), 100);

    // Se estiver abaixo do mínimo → vermelho puro
    if (v <= minimo) {
        return "#d15454"; // vermelho base (209,84,84)
    }

    // Normaliza o valor considerando o mínimo
    const t = (v - minimo) / (100 - minimo);

    // Interpolação do vermelho → verde
    const r = Math.round(209 + (76 - 209) * t);
    const g = Math.round(84 + (120 - 84) * t);
    const b = Math.round(84 + (204 - 84) * t);

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


export default function Distritos() {
    const [distData, setDistData] = useState<Record<string, number>>({});
    const distMin = useMemo(() => Math.min(...Object.values(distData)), [distData])

    console.log("distMin", distMin);

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
            fillColor: getColor(percentual, distMin),
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


