import React, { memo } from "react";

export const HeavyList = memo(({ value }) => {
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