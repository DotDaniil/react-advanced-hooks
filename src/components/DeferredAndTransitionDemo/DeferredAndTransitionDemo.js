import React, { useState, useDeferredValue, useTransition } from 'react';
import { TabSwitcher } from './TabSwitcher';
import { InputSection } from './InputSection';
import '../../styles/DeferredAndTransitionDemo.css';

export const DeferredAndTransitionDemo = () => {
    const [input, setInput] = useState('');
    const [query, setQueryRaw] = useState('');
    const [isPending, startTransition] = useTransition();
    const deferredQuery = useDeferredValue(query);

    const setQuery = (value) => {
        startTransition(() => {
            setQueryRaw(value);
        });
    };

    const [tab, setTab] = useState('posts');
    const [resource, setResource] = useState('posts');
    const [isResourcePending, startResourceTransition] = useTransition();

    return (
        <div className="demo-container-deferred-and-transition">
            <h2>Демонстрация useDeferredValue + useTransition</h2>

            <div className="components-container">
                <InputSection
                    input={input}
                    setInput={setInput}
                    query={deferredQuery}
                    setQuery={setQuery}
                    isPending={isPending}
                />

                <TabSwitcher
                    tab={tab}
                    setTab={setTab}
                    resource={resource}
                    setResource={setResource}
                    isPending={isResourcePending}
                    startTransition={startResourceTransition}
                />
            </div>


            <div className="explanation">
                <h3>Как это работает?</h3>
                <div className="explanation-grid">
                    <div className="explanation-column">
                        <h4>useDeferredValue</h4>
                        <ul className="feature-list">
                            <li>Возвращает отложенную версию значения</li>
                            <li>Позволяет откладывать несущественные обновления</li>
                            <li>Полезен для оптимизации тяжелых компонентов</li>
                            <li>React может "отложить" обновление, если система занята</li>
                        </ul>
                    </div>
                    <div className="explanation-column">
                        <h4>useTransition</h4>
                        <ul className="feature-list">
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
