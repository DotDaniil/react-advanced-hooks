import React, { useSyncExternalStore } from 'react';

// Создаем простое внешнее хранилище
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
        <div style={{
            padding: '20px',
            fontFamily: 'Arial',
            margin: '20px auto'
        }}>
            <h2>Демонстрация useSyncExternalStore</h2>

            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '20px',
                textAlign: 'left'
            }}>
                <p><strong>Как это работает:</strong></p>
                <ul style={{ listStyle: 'none' }}>
                    <li>Создано внешнее хранилище с состоянием</li>
                    <li>Компонент подписывается на изменения через <code>useSyncExternalStore</code></li>
                    <li>При изменении состояния хранилища компонент автоматически обновляется</li>
                </ul>
            </div>

            <div style={{
                fontSize: '24px',
                textAlign: 'center',
                margin: '20px 0'
            }}>
                Текущее значение: <strong>{state.count}</strong>
            </div>

            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
            }}>
                <button
                    onClick={decrement}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Уменьшить (-)
                </button>

                <button
                    onClick={increment}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Увеличить (+)
                </button>
            </div>

            <div style={{
                marginTop: '30px',
                padding: '15px',
                backgroundColor: '#e9f5fe',
                borderRadius: '5px',
                borderLeft: '4px solid #2196F3',
                textAlign: 'left'
            }}>
                <p><strong>Особенности useSyncExternalStore:</strong></p>
                <ul style={{ listStyle: 'none' }}>
                    <li>Позволяет работать с внешними источниками данных</li>
                    <li>Автоматически обрабатывает подписку и отписку</li>
                    <li>Гарантирует согласованность данных при конкурентном рендеринге</li>
                    <li>Часто используется для интеграции со сторонними state-менеджерами</li>
                </ul>
            </div>
        </div>
    );
};