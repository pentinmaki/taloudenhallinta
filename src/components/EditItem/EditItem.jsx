import styles from './EditItem.module.scss'
import ItemForm from '../ItemForm/ItemForm'
import { useLoaderData } from 'react-router-dom'

function EditItem(props) {
    const data = useLoaderData()
    const handleDelete = () => {
        props.onItemDelete(values.id)
        navigate(-1)
      }    

  return (
    <div className={styles.edititem}>
      <h2>Merkinnän muokkaaminen</h2>
      <ItemForm onItemSubmit={props.onItemSubmit}
                onItemDelete={props.onItemDelete}
                formData={data.item} 
                typelist={props.typelist} />

    </div>
  )

}

export default EditItem
