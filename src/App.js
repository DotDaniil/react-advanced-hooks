import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import './App.css';
import './styles/Home.css';

import {
    LayoutEffectDemo,
    ImperativeHandleDemo,
    ExternalStoreDemo,
    DeferredAndTransitionDemo
} from "./components";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Navigate to="/react-advanced-hooks" replace />} />
                    {/*<Route path="/react-advanced-hooks" element={*/}
                    {/*    <div className="home-container">*/}
                    {/*        <h1 className="home-title">React Advanced Hooks Demo</h1>*/}
                    {/*        <p>Выберите хук из навигации сверху для демонстрации.</p>*/}
                    {/*    </div>*/}
                    {/*} />*/}
                    <Route path="/layout-effect" element={<LayoutEffectDemo />} />
                    <Route path="/imperative-handle" element={<ImperativeHandleDemo />} />
                    <Route path="/sync-external-store" element={<ExternalStoreDemo />} />
                    <Route path="/deferred-value-and-transition" element={<DeferredAndTransitionDemo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;