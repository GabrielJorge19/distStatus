import Navigation from "@/components/Navigation";
import '@/styles/global.css';
import styles from '@/styles/map.module.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import "@/config/leaflet";


import AppProvider from "@/contexts/AppContext";
import DistStats from "@/pages/distStats";
import Maintances from '@/pages/maintances';
// import LoadingPage from './pages/LoadingPage';

function MapLayout() {
  return (<div id='testeLayout'>
    <Navigation />
    <MapContainer
      className={styles.map}
      center={[-23.5442026, -46.6322936]}
      zoom={11}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {/* 🔥 ROTAS DIRETAMENTE NO MAP */}
      <div className={styles.overlay}>

        <Outlet />
      </div>
    </MapContainer>
  </ div>)
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route element={<MapLayout />}>
            <Route path="/" element={<Navigate to="/distStats" replace />} />
            <Route path="/distStats" element={<DistStats />} />
            <Route path="/maintances" element={<Maintances />} />
          </Route>
        </Routes>
      </AppProvider>
    </HashRouter>
  )
}
