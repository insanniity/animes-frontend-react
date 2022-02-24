import { Breadcrumb } from 'react-bootstrap';

type Props ={
    controller : string;
    action : string;
}

const MyBreadcrumbs = ({controller, action}:Props) => {
    return(
        <Breadcrumb className="shadow-sm">
            <Breadcrumb.Item>{controller}</Breadcrumb.Item>
            <Breadcrumb.Item active>{action}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default MyBreadcrumbs;