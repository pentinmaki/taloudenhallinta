import styles from './Stats.module.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Stats(props) {
  const linedata = props.data.map(
    (item) => ({
      date: new Date(item.paymentDate).getTime(),
      amount: item.amount
    })
  )

  const locale = "fi-FI"
  const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })

  return (
    <div className={styles.stats}>
        <h2>Tilastot</h2>
        <h3>Kulut aikajanalla</h3>
      <ResponsiveContainer height={350}>
        <LineChart data={linedata}>
          <Line dataKey='amount' />
          <XAxis type='number'  
                 dataKey='date' 
                 domain={['dataMin','dataMax']} />
                    <XAxis type='number'  
                 dataKey='date' 
                 domain={['dataMin','dataMax']}
                 tickFormatter={
                   value => new Date(value).toLocaleDateString(locale)
                 } />
                           <Tooltip labelFormatter={ 
                     value => new Date(value).toLocaleDateString(locale)
                   } 
                   formatter={ 
                     value => [numberFormat.format(value),"maksettu"]
                   } />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Stats
