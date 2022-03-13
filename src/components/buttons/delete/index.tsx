import { Button } from "react-bootstrap"

type Props = {
    handleDelete: Function,
}

const ButtonDelete = ({handleDelete}: Props) => {
    return (      
        <Button variant="danger" className="d-inline-block ms-1" onClick={() => handleDelete()}>
            <i className="fas fa-trash" />
        </Button>      
    )
}

export default ButtonDelete;