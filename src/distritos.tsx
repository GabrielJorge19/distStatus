import { GeoJSON } from 'react-leaflet';
import geoJsonDistricts from './dadosDosDistritos';


export default function Distritos() {


    const distritos: any = {
        "type": "FeatureCollection",
        "name": "bairros",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": geoJsonDistricts
    }




    function handleHover({ target }: any) {
        target.setStyle({
            fillOpacity: 1,
            weight: 3,
            color: '#ccc'
        });

        target.bringToFront();
    };
    function handleClick(event: any) { console.log("Click event", event) }




    function handleMouseOut(e: any) { e.target.setStyle(geoJsonStyle(e.target.feature)) };

    const onEachFeature = (_feature: any, layer: { on: (arg0: string, arg1: { (event: any): void; ({ target }: { target: any; }): void; ({ target }: { target: any; }): void; (event: any): any; }) => void; }) => {

        layer.on('click', handleClick);
        layer.on('mouseover', handleHover);
        layer.on('mouseout', handleMouseOut);
        layer.on('contextmenu', () => { });

    };


    return !geoJsonDistricts ? null : <GeoJSON data={distritos} style={geoJsonStyle} onEachFeature={onEachFeature} />

}

const geoJsonStyle = (feature: any) => {

    const distName = feature.properties.NOME_DIST
    const operation = distData[distName];

    return {
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(operation)
    }
};

function getColor(valor: number) {
    // Garante o intervalo de 0 a 100
    const v = Math.min(Math.max(valor, 0), 100);
    const t = v / 100;

    // Interpolação linear dos canais RGB
    const r = Math.round(209 + (76 - 209) * t);
    const g = Math.round(84 + (120 - 84) * t);
    const b = Math.round(84 + (204 - 84) * t);

    // Converte para Hexadecimal com preenchimento de zeros
    const toHex = (n: number) => n.toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}




const distData: { [key: string]: number } = {
    "AGUA RASA": 1,
    "ALTO DE PINHEIROS": 0,
    "ANHANGUERA": 40,
    "ARICANDUVA": 70,
    "ARTUR ALVIM": 100,
    "BARRA FUNDA": 85,
    "BELA VISTA": 85,
    "BELEM": 85,
    "BOM RETIRO": 85,
    "BRAS": 85,
    "BRASILANDIA": 85,
    "BUTANTA": 85,
    "CACHOEIRINHA": 85,
    "CAMBUCI": 85,
    "CAMPO BELO": 85,
    "CAMPO GRANDE": 85,
    "CAMPO LIMPO": 85,
    "CANGAIBA": 85,
    "CAPAO REDONDO": 85,
    "CARRAO": 85,
    "CASA VERDE": 85,
    "CIDADE ADEMAR": 85,
    "CIDADE DUTRA": 85,
    "CIDADE LIDER": 85,
    "CIDADE TIRADENTES": 85,
    "CONSOLACAO": 85,
    "CURSINO": 85,
    "ERMELINO MATARAZZO": 85,
    "FREGUESIA DO O": 85,
    "GRAJAU": 85,
    "GUAIANASES": 85,
    "IGUATEMI": 85,
    "IPIRANGA": 85,
    "ITAIM BIBI": 85,
    "ITAIM PAULISTA": 85,
    "ITAQUERA": 85,
    "JABAQUARA": 85,
    "JACANA": 85,
    "JAGUARA": 85,
    "JAGUARE": 85,
    "JARAGUA": 85,
    "JARDIM ANGELA": 85,
    "JARDIM HELENA": 85,
    "JARDIM PAULISTA": 85,
    "JARDIM SAO LUIS": 85,
    "JOSE BONIFACIO": 85,
    "LAJEADO": 85,
    "LAPA": 85,
    "LIBERDADE": 85,
    "LIMAO": 85,
    "MANDAQUI": 85,
    "MARSILAC": 85,
    "MOEMA": 85,
    "MOOCA": 85,
    "MORUMBI": 85,
    "PARELHEIROS": 85,
    "PARI": 85,
    "PARQUE DO CARMO": 85,
    "PEDREIRA": 85,
    "PENHA": 85,
    "PERDIZES": 85,
    "PERUS": 85,
    "PINHEIROS": 85,
    "PIRITUBA": 85,
    "PONTE RASA": 85,
    "RAPOSO TAVARES": 85,
    "REPUBLICA": 85,
    "RIO PEQUENO": 85,
    "SACOMA": 85,
    "SANTA CECILIA": 85,
    "SANTANA": 85,
    "SANTO AMARO": 85,
    "SAO DOMINGOS": 85,
    "SAO LUCAS": 85,
    "SAO MATEUS": 85,
    "SAO MIGUEL": 85,
    "SAO RAFAEL": 85,
    "SAPOPEMBA": 85,
    "SAUDE": 85,
    "SE": 85,
    "SOCORRO": 85,
    "TATUAPE": 85,
    "TREMEMBE": 85,
    "TUCURUVI": 85,
    "VILA ANDRADE": 85,
    "VILA CURUCA": 85,
    "VILA FORMOSA": 85,
    "VILA GUILHERME": 85,
    "VILA JACUI": 85,
    "VILA LEOPOLDINA": 85,
    "VILA MARIA": 85,
    "VILA MARIANA": 85,
    "VILA MATILDE": 85,
    "VILA MEDEIROS": 85,
    "VILA PRUDENTE": 85,
    "VILA SONIA": 85,
}