import AppRouter from '../AppRouter'
import useLocalStorage from '../../shared/uselocalstorage'

function App() {
  const [data, setData] = useLocalStorage('taloudenhallinta-data',[])
  const [typelist, setTypelist] = useLocalStorage('taloudenhallinta-typelist',[])
  const [monthlyBudget, setMonthlyBudget] = useLocalStorage('taloudenhallinta-monthly-budget', 0)

  const handleItemDelete = (id) => {
    let copy = data.slice()
    copy = copy.filter(item => item.id !== id)
    setData(copy)
  }

  const handleTypeSubmit = (type) => {
    let copy = typelist.slice()
    copy.push(type)
    copy.sort()
    setTypelist(copy)
  }

  const handleItemSubmit = (newitem) => {
    let copy = data.slice()

    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      copy[index] = newitem
    } else {
      copy.push(newitem)
    }

    copy.sort( (a,b) => {
      const aDate = new Date(a.paymentDate)
      const bDate = new Date(b.paymentDate)
      return bDate - aDate
    })
    setData(copy)
  }

  const handleBudgetSubmit = (budget) => {
    setMonthlyBudget(Math.max(0, Number(budget) || 0))
  }

  return (
    <>
      <AppRouter data={data}
                 typelist={typelist}
                 monthlyBudget={monthlyBudget}
                 onItemSubmit={handleItemSubmit}
                 onItemDelete={handleItemDelete}
                 onTypeSubmit={handleTypeSubmit}
                 onBudgetSubmit={handleBudgetSubmit} />
    </>
  )
}

export default App
