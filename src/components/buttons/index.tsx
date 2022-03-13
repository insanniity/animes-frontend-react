import ButtonDelete from "./delete"
import ButtonEdit from "./edit"

type Props ={
    handleEdit: Function,
    handleDelete: Function,
}

const ActionButtons = ({handleEdit, handleDelete}:Props) => {
    return(         
        <>
            <ButtonEdit handleEdit={handleEdit} />
            <ButtonDelete handleDelete={handleDelete} />
        </>
        
    )
}

export default ActionButtons;
