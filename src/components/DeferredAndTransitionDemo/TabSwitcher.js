import React, { startTransition } from 'react';

const TabContent = ({ resource }) => {
    const contentMap = {
        posts: (
            <>
                <h4>Последние посты</h4>
                <ul className="feature-list">
                    <li>React 19 - что нового</li>
                    <li>Оптимизация производительности</li>
                    <li>Concurrent Mode в деталях</li>
                </ul>
            </>
        ),
        comments: (
            <>
                <h4>Свежие комментарии</h4>
                <ul className="feature-list">
                    <li>Отличная статья!</li>
                    <li>Спасибо за подробное объяснение</li>
                    <li>Когда выйдет новая версия?</li>
                </ul>
            </>
        ),
        users: (
            <>
                <h4>Активные пользователи</h4>
                <ul className="feature-list">
                    <li>Алексей Петров</li>
                    <li>Мария Иванова</li>
                    <li>Дмитрий Смирнов</li>
                </ul>
            </>
        )
    };

    return <div>{contentMap[resource]}</div>;
};

export const TabSwitcher = ({ tab, setTab, resource, setResource, isPending }) => {
    const tabs = ['posts', 'comments', 'users'];

    const switchTab = (newTab) => {
        setTab(newTab);
        startTransition(() => {
            setResource(newTab);
        });
    };

    return (
        <div className="tab-section">
            <h3>2. Переключение вкладок (useTransition)</h3>
            <div className="tab-buttons">
                {tabs.map((tabName) => (
                    <button
                        key={tabName}
                        onClick={() => switchTab(tabName)}
                        className={`tab-button ${tab === tabName ? 'active' : 'inactive'}`}
                    >
                        {tabName === 'posts' && 'Посты'}
                        {tabName === 'comments' && 'Комментарии'}
                        {tabName === 'users' && 'Пользователи'}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {isPending && <div className="loading-overlay">Загрузка {tab}...</div>}
                <TabContent resource={resource} />
            </div>

            <div style={{ marginTop: '10px', color: '#666' }}>
                <p>Обратите внимание: кнопки реагируют мгновенно, а контент вкладки обновляется с задержкой</p>
            </div>
        </div>
    );
};