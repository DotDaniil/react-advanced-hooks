import React, { useState, useEffect, useLayoutEffect } from 'react';

export const LayoutEffectDemo = () => {
    const [effectTime, setEffectTime] = useState(0);
    const [layoutEffectTime, setLayoutEffectTime] = useState(0);
    const [renderTime, setRenderTime] = useState(0);
    const [showDifference, setShowDifference] = useState(false);

    // Используем ref для хранения начального времени
    const startTime = React.useRef(performance.now());

    useLayoutEffect(() => {
        const endTime = performance.now();
        setLayoutEffectTime(endTime - startTime.current);
    }, []);

    useEffect(() => {
        const endTime = performance.now();
        setEffectTime(endTime - startTime.current);
        setShowDifference(true);
    }, []);

    // Фиксируем время рендера в useLayoutEffect
    useLayoutEffect(() => {
        setRenderTime(performance.now() - startTime.current);
    }, []);

    // Начало рендера
    // ├─ useLayoutEffect (синхронно, до paint)
    // ├─ Фактический рендер (paint)
    // └─ useEffect (асинхронно, после paint)

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Разница во времени выполнения (мс)</h2>

            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                margin: '20px 0'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h3>useLayoutEffect</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            {layoutEffectTime.toFixed(2)} ms
                        </p>
                    </div>

                    <div>
                        <h3>Рендер</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            {renderTime.toFixed(2)} ms
                        </p>
                    </div>

                    <div>
                        <h3>useEffect</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                            {effectTime.toFixed(2)} ms
                        </p>
                    </div>
                </div>

                {showDifference && (
                    <div style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#e0f7fa',
                        borderRadius: '4px'
                    }}>
                        <p><strong>Разница:</strong></p>
                        <ul style={{listStyle: 'none'}}>
                            <li>useLayoutEffect сработал на {(layoutEffectTime - renderTime).toFixed(2)} ms {layoutEffectTime > renderTime ? 'после' : 'до'} рендера</li>
                            <li>useEffect сработал на {(effectTime - renderTime).toFixed(2)} ms после рендера</li>
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px', color: '#555' }}>
                <p style={{textAlign: 'left'}}><strong>Что происходит:</strong></p>
                <ol style={{textAlign: 'left'}}>
                    <li>Компонент начинает рендериться (фиксируем начальное время)</li>
                    <li><b>useLayoutEffect</b> выполняется сразу после вычислений виртуального DOM, но ДО отрисовки в браузере</li>
                    <li>Браузер отрисовывает компонент (рендер)</li>
                    <li><b>useEffect</b> выполняется ПОСЛЕ отрисовки</li>
                </ol>
            </div>
        </div>
    );
};
