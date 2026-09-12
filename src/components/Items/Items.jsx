import styles from './Items.module.scss'
import { FloatingButton } from '../../shared/buttons'
import Item from '../Item/Item'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const locale = 'fi-FI'
const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })

const getMonthValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

const getMonthLabel = (month) => {
  const [year, monthNumber] = month.split('-').map(Number)
  const label = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
    .format(new Date(year, monthNumber - 1, 1))

  return label.charAt(0).toUpperCase() + label.slice(1)
}

function Items({ data, monthlyBudget }) {
  const [selectedMonth, setSelectedMonth] = useState(() => getMonthValue(new Date()))
  const monthItems = data.filter(item => item.paymentDate?.slice(0, 7) === selectedMonth)
  const spent = monthItems.reduce((total, item) => total + (Number(item.amount) || 0), 0)
  const budget = Number(monthlyBudget) || 0
  const remaining = budget - spent
  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const items = monthItems.map(item => <Item key={item.id} data={item} />)

  const changeMonth = (amount) => {
    const [year, month] = selectedMonth.split('-').map(Number)
    setSelectedMonth(getMonthValue(new Date(year, month - 1 + amount, 1)))
  }

  return (
    <div className={styles.items}>
      <section className={styles.monthlySummary} aria-labelledby="month-summary-title">
        <div className={styles.monthPicker}>
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Edellinen kuukausi">‹</button>
          <div>
            <p id="month-summary-title">Kuukauden yhteenveto</p>
            <label className={styles.monthLabel}>
              <span>{getMonthLabel(selectedMonth)}</span>
              <input
                type="month"
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
                aria-label="Valitse kuukausi"
              />
            </label>
          </div>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Seuraava kuukausi">›</button>
        </div>

        <div className={styles.summaryValues}>
          <div>
            <span>Kulut</span>
            <strong>{numberFormat.format(spent)}</strong>
          </div>
          <div>
            <span>Budjetti</span>
            <strong>{budget ? numberFormat.format(budget) : 'Ei asetettu'}</strong>
          </div>
          <div className={remaining < 0 ? styles.overBudget : ''}>
            <span>{remaining < 0 ? 'Ylitetty' : 'Jäljellä'}</span>
            <strong>{budget ? numberFormat.format(Math.abs(remaining)) : '—'}</strong>
          </div>
        </div>

        {budget > 0 && (
          <div className={styles.progress} aria-label={`${Math.round(percentage)} prosenttia budjetista käytetty`}>
            <div style={{ width: `${percentage}%` }} />
          </div>
        )}
        {!budget && <Link className={styles.setBudgetLink} to="/settings">Aseta kuukausibudjetti asetuksissa →</Link>}
      </section>

      <h2 className={styles.listTitle}>Menot</h2>
      {items.length ? items : <p className={styles.empty}>Ei menoja valitulla kuukaudella.</p>}
      <Link to="/add"><FloatingButton secondary>+</FloatingButton></Link>
    </div>
  )

}

export default Items
