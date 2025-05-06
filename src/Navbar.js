import { Link } from 'react-router-dom';
import './styles/Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li>
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/layout-effect" className="nav-link">
                        useLayoutEffect Demo
                    </Link>
                </li>
                <li>
                    <Link to="/imperative-handle" className="nav-link">
                        useImperativeHandle Demo
                    </Link>
                </li>
                <li>
                    <Link to="/sync-external-store" className="nav-link">
                        useSyncExternalStore Demo
                    </Link>
                </li>
                <li>
                    <Link to="/deferred-value-and-transition" className="nav-link">
                        useDeferredValue & useTransition Demo
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
