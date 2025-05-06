import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutEffectDemo } from "./use-layout-effect";
import { ImperativeHandleDemo } from "./use-imperative-handle";
import {ExternalStoreDemo} from "./use-sync-external-store";

function App() {
    return (
        <Router>
            <div className="App">
                <nav style={{
                    backgroundColor: '#f0f0f0',
                    padding: '10px 20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <ul style={{
                        display: 'flex',
                        listStyle: 'none',
                        gap: '20px',
                        margin: 0,
                        padding: 0
                    }}>
                        <li>
                            <Link
                                to="/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s'
                                }}
                                activeStyle={{ backgroundColor: '#ddd' }}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/layout-effect"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s'
                                }}
                                activeStyle={{ backgroundColor: '#ddd' }}
                            >
                                useLayoutEffect Demo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/imperative-handle"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s'
                                }}
                                activeStyle={{ backgroundColor: '#ddd' }}
                            >
                                useImperativeHandle Demo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sync-external-store"
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s'
                                }}
                                activeStyle={{ backgroundColor: '#ddd' }}
                            >
                                useSyncExternalStore Demo
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={
                        <div style={{ padding: '20px' }}>
                            <h1>React Hooks Demo</h1>
                            <p>Выберите хук из навигации сверху для демонстрации.</p>
                        </div>
                    } />
                    <Route path="/layout-effect" element={<LayoutEffectDemo />} />
                    <Route path="/imperative-handle" element={<ImperativeHandleDemo />} />
                    <Route path="/sync-external-store" element={<ExternalStoreDemo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;