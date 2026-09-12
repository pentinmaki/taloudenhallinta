import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from '../ErrorPage'
import Items from '../Items'
import Root from '../Root'
import Settings from '../Settings'
import Stats from '../Stats'
import AddItem from '../AddItem'
import EditItem from '../EditItem'

function AppRouter(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", 
          element: <Items data={props.data} monthlyBudget={props.monthlyBudget} /> },
          { path: "stats", element: <Stats data={props.data} /> },
        { path: "edit/:id",
          element: <EditItem onItemSubmit={props.onItemSubmit}
          onItemDelete={props.onItemDelete} 
          typelist={props.typelist} />,


          loader: ({params}) => {
            const item = props.data.filter(item => item.id === params.id).shift()
            if (item) {
              return { item }
            } else {
              throw new Response("Not Found", { status: 404 })
            }
          } },
          { path: "add", 
            element: <AddItem onItemSubmit={props.onItemSubmit} 
                              typelist={props.typelist} /> },
  
          { path: "settings",
            element: <Settings typelist={props.typelist}
            monthlyBudget={props.monthlyBudget}
            onTypeSubmit={props.onTypeSubmit}
            onBudgetSubmit={props.onBudgetSubmit} /> }
                      
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter
