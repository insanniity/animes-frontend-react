import { Button } from "react-bootstrap"


type Props = {
    handleEdit: Function,
}

const ButtonEdit = ({handleEdit}: Props) => {
    return (        
        <Button className="d-inline-block" onClick={() => handleEdit()}>
            <i className="fas fa-edit"/>
        </Button>        
    )
}

export default ButtonEdit;