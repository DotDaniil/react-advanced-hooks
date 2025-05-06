import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import '../styles/ImperativeHandleDemo.css';

const CustomInput = forwardRef(({ placeholder, className }, ref) => {
    const inputRef = useRef();

    // useImperativeHandle позволяет определить методы,
    // которые будут доступны родительскому компоненту через ref
    // В этом примере мы предоставляем 3 метода:
    // - focus() - установка фокуса на input
    // - clear() - очистка значения
    // - getValue() - получение текущего значения
    useImperativeHandle(ref, () => ({
        focus: () => {
            console.log('Вызван метод focus() из родительского компонента');
            inputRef.current.focus();
        },
        clear: () => {
            console.log('Вызван метод clear() из родительского компонента');
            inputRef.current.value = '';
        },
        getValue: () => {
            console.log('Вызван метод getValue() из родительского компонента');
            return inputRef.current.value;
        }
    }));

    return (
        <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className={`input-field ${className}`}
        />
    );
});

export const ImperativeHandleDemo = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const handleFocusFirst = () => {
        // Вызываем метод focus() первого инпута через ref
        firstNameRef.current.focus();
    };

    const handleClearAll = () => {
        // Вызываем метод clear() обоих инпутов через ref
        firstNameRef.current.clear();
        lastNameRef.current.clear();
    };

    const handleShowValues = () => {
        // Вызываем метод getValue() обоих инпутов через ref
        alert(`Значения: ${firstNameRef.current.getValue()}, ${lastNameRef.current.getValue()}`);
    };

    return (
        <div className="demo-container-imperative-handle">
            <h2>Демонстрация useImperativeHandle</h2>

            <div className="explanation">
                <p><strong>Как это работает:</strong></p>
                <p>Компонент CustomInput использует useImperativeHandle, чтобы предоставить родительскому компоненту доступ к следующим методам:</p>
                <ul className="feature-list">
                    <li><strong>focus()</strong> - устанавливает фокус на input</li>
                    <li><strong>clear()</strong> - очищает значение input</li>
                    <li><strong>getValue()</strong> - возвращает текущее значение input</li>
                </ul>
                <p>При нажатии кнопок внизу родительский компонент вызывает эти методы через ref.</p>
            </div>

            <CustomInput
                ref={firstNameRef}
                placeholder="Имя"
            />

            <CustomInput
                ref={lastNameRef}
                placeholder="Фамилия"
                className="last-name-input"
            />

            <div className="buttons-container">
                <button
                    onClick={handleFocusFirst}
                    className="button button-focus">
                    Фокус на имя
                </button>

                <button
                    onClick={handleClearAll}
                    className="button button-clear">
                    Очистить все
                </button>

                <button
                    onClick={handleShowValues}
                    className="button button-show">
                    Показать значения
                </button>
            </div>

            <div className="console-notice">
                <p><strong>Что происходит в консоли:</strong></p>
                <p>При нажатии кнопок в консоли выводятся сообщения о вызове соответствующих методов.</p>
                <p>Откройте консоль разработчика (F12), чтобы увидеть логи вызовов.</p>
            </div>
        </div>
    );
};