import style from "@/styles/filterButton.module.css";


type Props = {
  cpfs: string[]
  cpf: string | null
  date: string | null
  onCpfChange: (v: string | null) => void
  onDateChange: (v: string | null) => void
}

export function MaintancesFilter({ cpfs, cpf, date, onCpfChange, onDateChange }: Props) {

  return (
    <aside className={style.container}>
      <div className={style.content}>
        <header className={style.header}>
          <strong>Filtros</strong>
        </header>

        <select
          className={style.field}
          aria-label="Filtrar por CPF"
          value={cpf ?? ''}
          onChange={e => onCpfChange(e.target.value || null)}
        >
          <option value="">Todos os CPFs</option>
          {cpfs.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          className={style.field}
          type="date"
          aria-label="Filtrar por data"
          value={date ?? ''}
          onChange={e => onDateChange(e.target.value || null)}
        />
      </div>
    </aside>
  )
}
