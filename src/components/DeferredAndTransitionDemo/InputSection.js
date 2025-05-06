import React from 'react';
import { HeavyList } from './HeavyList';

export const InputSection = ({ input, setInput, query, setQuery, isPending }) => {
    const handleChange = (e) => {
        // Срочное обновление: input должен меняться мгновенно
        setInput(e.target.value);

        // Отложенное обновление: список можно обновить позже
        setQuery(e.target.value);
    };

    return (
        <div className="input-section">
            <h3>1. Отложенный ввод (useDeferredValue + useTransition)</h3>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                className="input-field"
                placeholder="Введите текст..."
            />

            <div className="value-display">
                <div className="value-box immediate-value">
                    <h4>Срочное значение (input):</h4>
                    {input || <span style={{ color: '#999' }}>Пусто</span>}
                </div>
                <div className={`value-box deferred-value ${isPending ? 'pending' : ''}`}>
                    <h4>Отложенное значение (deferredQuery):</h4>
                    {query || <span style={{ color: '#999' }}>Пусто</span>}
                    {isPending && <span className="updating-text">Обновление...</span>}
                </div>
            </div>

            <div className="heavy-list-container" style={{ opacity: isPending ? 0.6 : 1 }}>
                <h4>Тяжелый список (рендерится по отложенному значению):</h4>
                <HeavyList value={query} />
            </div>
        </div>
    );
};
