import styles from './Settings.module.scss'
import Button from '../../shared/buttons'

function Settings(props) {

  const handleTypeSubmit = (event) => {
    event.preventDefault()
    const newtype = event.target.elements.type.value
    props.onTypeSubmit(newtype)
    event.target.elements.type.value = ''
  }

  const handleBudgetSubmit = (event) => {
    event.preventDefault()
    props.onBudgetSubmit(event.target.elements.monthlyBudget.value)
  }

  return (
    <div className={styles.settings}>
      <h2>Asetukset</h2>
      <h3>Kuukausibudjetti</h3>
      <form onSubmit={handleBudgetSubmit}>
        <div className={styles.settings_form}>
          <input
            aria-label="Kuukausibudjetti euroina"
            defaultValue={props.monthlyBudget || ''}
            min="0"
            name="monthlyBudget"
            placeholder="Esim. 1 500"
            step="0.01"
            type="number"
          />
          <Button type='submit' primary>Tallenna</Button>
        </div>
      </form>
      <h3>Kulutyypit</h3>
      <div className={styles.settings_types}>
        { props.typelist.map(
            type => <div key={type}>{type}</div>
        )}
          
          <form onSubmit={handleTypeSubmit}>

          <div className={styles.settings_form}>
            <input type='text' name='type' />
            <Button type='submit' primary>Lisää</Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Settings
