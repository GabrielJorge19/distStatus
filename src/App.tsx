import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import './App.css';
import Distritos from "./distritos";
import Legend from './legend';

function App() {


  return (
    <MapContainer
      style={{ height: '100vh', width: '100%' }}
      center={[-23.5442026, -46.6322936]}
      zoom={11}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Distritos />
      <Legend />
    </MapContainer>
  )
}

export default App