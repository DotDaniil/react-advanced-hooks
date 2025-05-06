import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import '../styles/LayoutEffectDemo.css';

export const LayoutEffectDemo = () => {
    const [effectTime, setEffectTime] = useState(0);
    const [layoutEffectTime, setLayoutEffectTime] = useState(0);
    const [renderTime, setRenderTime] = useState(0);
    const [showDifference, setShowDifference] = useState(false);
    const startTime = useRef(performance.now());

    useLayoutEffect(() => {
        const endTime = performance.now();
        setLayoutEffectTime(endTime - startTime.current);
    }, []);

    useEffect(() => {
        const endTime = performance.now();
        setEffectTime(endTime - startTime.current);
        setShowDifference(true);
    }, []);

    // Время рендера для демонстрации.
    useLayoutEffect(() => {
        setRenderTime(performance.now() - startTime.current);
    }, []);

    // Фиксируем время рендера в useLayoutEffect.
    // Не совсем точно отражает момент фактической отрисовки.
    // Настоящий "paint" происходит между useLayoutEffect и useEffect, но измерить его момент сложно

    // -----------------------------------------------------------------------------------

    // Начало рендера
    // ├─ useLayoutEffect (синхронно, до paint)
    // ├─ Фактический рендер (paint)
    // └─ useEffect (асинхронно, после paint)

    return (
        <div className="layout-effect-demo">
            <h2>Демонстрация useLayoutEffect</h2>

            <div className="tip">
                <ul className="tip-list">
                    <li>Не совсем точно отражает момент фактической отрисовки</li>
                    <li>Настоящий "paint" происходит между useLayoutEffect и useEffect, но измерить его момент сложно</li>
                    <li>Может потребоваться перезагрузить страницу</li>
                </ul>
            </div>

            <h2 className="demo-title">Разница во времени выполнения (мс)</h2>

            <div className="stats-container">
                <div className="stats-grid">
                    <div className="stat-item">
                        <h3>useLayoutEffect</h3>
                        <p className="stat-value">{layoutEffectTime.toFixed(2)} ms</p>
                    </div>

                    <div className="stat-item">
                        <h3>Рендер</h3>
                        <p className="stat-value">{renderTime.toFixed(2)} ms</p>
                    </div>

                    <div className="stat-item">
                        <h3>useEffect</h3>
                        <p className="stat-value">{effectTime.toFixed(2)} ms</p>
                    </div>
                </div>

                {showDifference && (
                    <div className="difference-container">
                        <p><strong>Разница:</strong></p>
                        <ul className="difference-list">
                            <li>useLayoutEffect сработал на {(layoutEffectTime - renderTime).toFixed(2)} ms {layoutEffectTime > renderTime ? 'после' : 'до'} рендера</li>
                            <li>useEffect сработал на {(effectTime - renderTime).toFixed(2)} ms после рендера</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="explanation">
                <p><strong>Что происходит:</strong></p>
                <ol className="explanation-list">
                    <li>Компонент начинает рендериться (фиксируем начальное время)</li>
                    <li><b>useLayoutEffect</b> выполняется сразу после вычислений виртуального DOM, но ДО отрисовки в браузере</li>
                    <li>Браузер отрисовывает компонент (рендер)</li>
                    <li><b>useEffect</b> выполняется ПОСЛЕ отрисовки</li>
                </ol>
            </div>
        </div>
    );
};