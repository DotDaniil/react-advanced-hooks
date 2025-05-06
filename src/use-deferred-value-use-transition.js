import React, { useState, useDeferredValue, useTransition, memo } from 'react';

const HeavyList = memo(({ value }) => {
    // Имитация тяжелого рендера
    const items = [];
    for (let i = 0; i < 10000; i++) {
        items.push(
            <div key={i} style={{ padding: '2px' }}>
                {value} - {i}
            </div>
        );
    }

    return <div style={{ height: '200px', overflow: 'auto' }}>{items}</div>;
});

export const DeferredAndTransitionDemo = () => {
    const [input, setInput] = useState('');
    const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    const deferredQuery = useDeferredValue(query);

    const [tab, setTab] = useState('posts');
    const [resource, setResource] = useState('posts');
    const [isResourcePending, startResourceTransition] = useTransition();

    const handleChange = (e) => {
        // Срочное обновление: инпут должен реагировать мгновенно
        setInput(e.target.value);

        // Отложенное обновление: тяжелый список может обновиться позже
        startTransition(() => {
            setQuery(e.target.value);
        });
    };

    const switchTab = (newTab) => {
        setTab(newTab);
        startResourceTransition(() => {
            setResource(newTab);
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
            <h2>useDeferredValue + useTransition Demo</h2>

            <div style={{ marginBottom: '30px' }}>
                <h3>1. Отложенный ввод (useDeferredValue + useTransition)</h3>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    style={{ padding: '8px', width: '100%', fontSize: '16px' }}
                    placeholder="Введите текст..."
                />

                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <div style={{ flex: 1, marginRight: '10px' }}>
                        <h4>Срочное значение (input):</h4>
                        <div style={{ padding: '10px', background: '#e3f2fd' }}>
                            {input || <span style={{ color: '#999' }}>Пусто</span>}
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4>Отложенное значение (deferredQuery):</h4>
                        <div style={{
                            padding: '10px',
                            background: '#e8f5e9',
                            opacity: isPending ? 0.5 : 1,
                            transition: 'opacity 0.2s'
                        }}>
                            {deferredQuery || <span style={{ color: '#999' }}>Пусто</span>}
                            {isPending && <span style={{ marginLeft: '10px', color: '#ff9800' }}>Обновление...</span>}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h4>Тяжелый список (рендерится по отложенному значению):</h4>
                    <div style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        opacity: isPending ? 0.6 : 1,
                        transition: 'opacity 0.3s'
                    }}>
                        <HeavyList value={deferredQuery} />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3>2. Переключение вкладок (useTransition)</h3>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <button
                        onClick={() => switchTab('posts')}
                        style={{
                            padding: '8px 16px',
                            marginRight: '8px',
                            background: tab === 'posts' ? '#2196f3' : '#e0e0e0',
                            color: tab === 'posts' ? 'white' : 'black',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Посты
                    </button>
                    <button
                        onClick={() => switchTab('comments')}
                        style={{
                            padding: '8px 16px',
                            marginRight: '8px',
                            background: tab === 'comments' ? '#2196f3' : '#e0e0e0',
                            color: tab === 'comments' ? 'white' : 'black',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Комментарии
                    </button>
                    <button
                        onClick={() => switchTab('users')}
                        style={{
                            padding: '8px 16px',
                            background: tab === 'users' ? '#2196f3' : '#e0e0e0',
                            color: tab === 'users' ? 'white' : 'black',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Пользователи
                    </button>
                </div>

                <div style={{
                    padding: '15px',
                    border: '1px solid #ddd',
                    minHeight: '100px',
                    position: 'relative'
                }}>
                    {isResourcePending ? (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(255, 255, 255, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff9800',
                            fontSize: '18px'
                        }}>
                            Загрузка {tab}...
                        </div>
                    ) : null}

                    {resource === 'posts' && (
                        <div>
                            <h4>Последние посты</h4>
                            <ul style={{ listStyle: 'none' }}>
                                <li>React 19 - что нового</li>
                                <li>Оптимизация производительности</li>
                                <li>Concurrent Mode в деталях</li>
                            </ul>
                        </div>
                    )}

                    {resource === 'comments' && (
                        <div>
                            <h4>Свежие комментарии</h4>
                            <ul style={{ listStyle: 'none' }}>
                                <li>Отличная статья!</li>
                                <li>Спасибо за подробное объяснение</li>
                                <li>Когда выйдет новая версия?</li>
                            </ul>
                        </div>
                    )}

                    {resource === 'users' && (
                        <div>
                            <h4>Активные пользователи</h4>
                            <ul style={{ listStyle: 'none' }}>
                                <li>Алексей Петров</li>
                                <li>Мария Иванова</li>
                                <li>Дмитрий Смирнов</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '10px', color: '#666' }}>
                    <p>Обратите внимание: кнопки реагируют мгновенно, а контент вкладки обновляется с задержкой</p>
                </div>
            </div>

            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '4px',
                marginTop: '30px'
            }}>
                <h3>Как это работает?</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px', padding: '10px' }}>
                        <h4>useDeferredValue</h4>
                        <ul style={{ textAlign: 'left' }}>
                            <li>Возвращает отложенную версию значения</li>
                            <li>Позволяет откладывать несущественные обновления</li>
                            <li>Полезен для оптимизации тяжелых компонентов</li>
                            <li>React может "отложить" обновление, если система занята</li>
                        </ul>
                    </div>
                    <div style={{ flex: 1, minWidth: '300px', padding: '10px' }}>
                        <h4>useTransition</h4>
                        <ul style={{ textAlign: 'left' }}>
                            <li>Позволяет помечать обновления как не срочные</li>
                            <li>Возвращает <code>isPending</code> флаг для индикации загрузки</li>
                            <li>Делает интерфейс более отзывчивым</li>
                            <li>Полезен для сложных переходов между состояниями</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};