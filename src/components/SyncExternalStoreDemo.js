import React, { useSyncExternalStore } from 'react';
import '../styles/SyncExternalStoreDemo.css';

// Выносим создание хранилища в отдельную функцию
function createStore(initialState) {
    let state = initialState;
    const listeners = new Set();

    return {
        getState() {
            return state;
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setState(newState) {
            state = newState;
            listeners.forEach(listener => listener());
        }
    };
}

// Создаем экземпляр хранилища
const counterStore = createStore({ count: 0 });

// Компонент, использующий useSyncExternalStore
export const ExternalStoreDemo = () => {
    const state = useSyncExternalStore(
        counterStore.subscribe,
        counterStore.getState
    );

    const increment = () => {
        counterStore.setState({ count: state.count + 1 });
    };

    const decrement = () => {
        counterStore.setState({ count: state.count - 1 });
    };

    return (
        <div className="demo-container">
            <h2>Демонстрация useSyncExternalStore</h2>

            <div className="explanation">
                <p><strong>Как это работает:</strong></p>
                <ul className="feature-list">
                    <li>Создано внешнее хранилище с состоянием</li>
                    <li>Компонент подписывается на изменения через <code>useSyncExternalStore</code></li>
                    <li>При изменении состояния хранилища компонент автоматически обновляется</li>
                </ul>
            </div>

            <div className="counter-value">
                Текущее значение: <strong>{state.count}</strong>
            </div>

            <div className="buttons-container">
                <button
                    onClick={decrement}
                    className="button button-decrement">
                    Уменьшить (-)
                </button>

                <button
                    onClick={increment}
                    className="button button-increment">
                    Увеличить (+)
                </button>
            </div>

            <div className="features">
                <p><strong>Особенности useSyncExternalStore:</strong></p>
                <ul className="feature-list">
                    <li>Позволяет работать с внешними источниками данных</li>
                    <li>Автоматически обрабатывает подписку и отписку</li>
                    <li>Гарантирует согласованность данных при конкурентном рендеринге</li>
                    <li>Часто используется для интеграции со сторонними state-менеджерами</li>
                </ul>
            </div>
        </div>
    );
};