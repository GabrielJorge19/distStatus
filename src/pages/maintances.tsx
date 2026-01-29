import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { MaintancesFilter } from '@/components/MaintancesFilter';
import { useApp } from "@/contexts/AppContext";
import { useMaintances } from '@/hooks/useManutencoesData';

export default function Maintances() {
  const map = useMap()

  const { data } = useApp();
  const { filtered, cpfs, cpf, date, setCpf, setDate } = useMaintances(data?.maintances.data || [])


  useEffect(() => {
    if (!filtered.length) return

    const layer = L.featureGroup(
      filtered.map(item =>
        L.marker([+item.coordenaday, +item.coordenadax])
          .bindPopup(
            `<strong>CPF:</strong> ${item.cpf}<br/>
           <strong>Data:</strong> ${item.data}`
          )
      )
    )

    layer.addTo(map)

    const bounds = layer.getBounds()

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [40, 40],
        maxZoom: 12,
        animate: true,
        duration: 0.8
      })
    }

    return () => {
      map.removeLayer(layer)
    }
  }, [map, filtered])


  return (
    <MaintancesFilter
      cpfs={cpfs}
      cpf={cpf}
      date={date}
      onCpfChange={setCpf}
      onDateChange={setDate}
    />
  )
}
