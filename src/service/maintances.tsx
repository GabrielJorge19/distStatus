import type { Manutencao } from '@/types'
import * as XLSX from 'xlsx'

/* =======================
 * Tipos
 * ======================= */

type ExcelRowRaw = Record<string, string>

type ExcelResult<T> = {
  data: T[]
  header: string[]
  size: number
}

/* =======================
 * API pública
 * ======================= */

export default async function fetchData() {
  const URL = 'https://tcrtcjrkdfjpzvrewhgg.supabase.co/functions/v1/hidrantes/manutencoes'
  // const URL = '/distStatus/fakedata/manutencoes.xlsx'

  const result = await excelUrlToJson<Manutencao>(URL, mapToManutencao)

  return result;
  // const agrupado = agruparPorCpfNaData(result.data, '1/22/26')
  // console.log(agrupado)
}

/* =======================
 * Excel → JSON
 * ======================= */

async function excelUrlToJson<T>(
  url: string,
  mapper: (row: ExcelRowRaw) => T,
  limit = 6000
): Promise<ExcelResult<T>> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Falha ao baixar arquivo: ${response.status}`)
  }

  const buffer = await response.arrayBuffer()
  const workbook = XLSX.read(buffer, {
    type: 'array',
    cellFormula: true,
  })

  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  const matrix = XLSX.utils.sheet_to_json<string[]>(worksheet, {
    header: 1,
    defval: '',
  })

  if (matrix.length === 0) {
    return { data: [], header: [], size: 0 }
  }

  const headers = matrix[0].map(String)

  const data = matrix
    .slice(1, limit + 1)
    .map((_, rowIndex) =>
      extractRow(worksheet, headers, rowIndex + 1)
    )
    .map(mapper)

  return {
    data,
    header: headers,
    size: data.length,
  }
}

/* =======================
 * Helpers
 * ======================= */

function extractRow(
  worksheet: XLSX.WorkSheet,
  headers: string[],
  rowIndex: number
): ExcelRowRaw {
  return headers.reduce<ExcelRowRaw>((acc, header, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex })
    acc[header] = getCellValue(worksheet[cellRef])
    return acc
  }, {})
}

function getCellValue(cell: XLSX.CellObject | undefined): string {
  if (!cell) return ''

  if (typeof cell.f === 'string') {
    const match = cell.f.match(/HIPERLINK\([^"]*"([^"]+)"/i)
    if (match) return match[1]
  }

  return String(cell.w ?? cell.v ?? '')
}

/* =======================
 * Mappers
 * ======================= */

function mapToManutencao(row: ExcelRowRaw): Manutencao {
  return {
    id: row.hidrante_id,
    cpf: row.cpf,
    data: row.datafim,
    coordenadax: row.coordenadax,
    coordenaday: row.coordenaday,
    coordenada_acuraciah: row.coordenada_acuraciah,
  }
}

/* =======================
 * Agrupamento
 * ======================= */

// function agruparPorCpfNaData<T extends { cpf: string; data: string }>(
//   items: T[],
//   dataAlvo: string
// ): Record<string, T[]> {
//   return items.reduce<Record<string, T[]>>((acc, item) => {
//     if (item.data !== dataAlvo) return acc

//     acc[item.cpf] ??= []
//     acc[item.cpf].push(item)

//     return acc
//   }, {})
// }
