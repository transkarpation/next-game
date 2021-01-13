import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Cell from '../components/Cell'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Row({cells, activePosition, row, setFields, emit}) {
    return (
        <div className={cn('row')}>
            {
                cells.map((el, index) => {
                    return <Cell setFields={setFields} emit={emit} activePosition={activePosition} cell={index} row={row} state={el} key={index}></Cell>
                })
            }
        </div>
    )
}
