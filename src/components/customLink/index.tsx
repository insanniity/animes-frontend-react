import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";


const CustomLink = ({ children, to, ...props }: LinkProps) => {
    const resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    return (
        <li className="nav-item">
            <Link to={to} className={`nav-link ${match ? "active" : ""}`} {...props}>{children}</Link>
        </li>
    )
}

export default CustomLink;