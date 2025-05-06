import React, { forwardRef, useRef, useImperativeHandle } from 'react';

export const CustomInput = forwardRef((props, ref) => {
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
            placeholder={props.placeholder}
            style={props.style}
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
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Демонстрация useImperativeHandle</h2>

            <div style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '20px',
                textAlign: 'left'
            }}>
                <p><strong>Как это работает:</strong></p>
                <p>Компонент CustomInput использует useImperativeHandle, чтобы предоставить родительскому компоненту доступ к следующим методам:</p>
                <ul style={{ listStyle: 'none' }}>
                    <li><strong>focus()</strong> - устанавливает фокус на input</li>
                    <li><strong>clear()</strong> - очищает значение input</li>
                    <li><strong>getValue()</strong> - возвращает текущее значение input</li>
                </ul>
                <p>При нажатии кнопок внизу родительский компонент вызывает эти методы через ref.</p>
            </div>

            <CustomInput
                ref={firstNameRef}
                placeholder="Имя"
                style={{
                    marginBottom: '10px',
                    padding: '8px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            />

            <CustomInput
                ref={lastNameRef}
                placeholder="Фамилия"
                style={{
                    marginBottom: '20px',
                    padding: '8px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            />

            <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={handleFocusFirst}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Фокус на имя
                </button>

                <button
                    onClick={handleClearAll}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Очистить все
                </button>

                <button
                    onClick={handleShowValues}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Показать значения
                </button>
            </div>

            <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#e9f5fe',
                borderRadius: '5px',
                borderLeft: '4px solid #2196F3'
            }}>
                <p><strong>Что происходит в консоли:</strong></p>
                <p>При нажатии кнопок в консоли выводятся сообщения о вызове соответствующих методов.</p>
                <p>Откройте консоль разработчика (F12), чтобы увидеть логи вызовов.</p>
            </div>
        </div>
    );
};