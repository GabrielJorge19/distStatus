import type { Manutencao } from '@/types'
import { useMemo, useState } from 'react'


export function useMaintances(data: Manutencao[]) {
  const [cpf, setCpf] = useState<string | null>("511********")
  const [date, setDate] = useState<string | null>("")

  const cpfs = useMemo(
    () => Array.from(new Set(data.map(d => d.cpf))),
    [data]
  )


  // console.log(data.slice(0, 5))


  const filtered = useMemo(
    () => {

      if (date === "") return [];

      const result = data.filter(hid => {
        let cpfOk = (!cpf || hid.cpf === cpf);
        let dataOk = (!date || parseDate(hid.data) === date)

        return cpfOk && dataOk
      })

      return result

    }, [data, cpf, date]
  )

  return { data, filtered, cpfs, cpf, date, setCpf, setDate }
}


function parseDate(dateStr: string) {
  const [month, day, year] = dateStr.split('/');

  // Prepends "20" to the year and pads month/day with leading zeros
  const fullYear = `20${year}`;
  const mm = month.padStart(2, '0');
  const dd = day.padStart(2, '0');

  return `${fullYear}-${mm}-${dd}`;
}