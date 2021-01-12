import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Cell from '../components/Cell'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Row({cells}) {
    return (
        <div className={cn('row')}>
            {
                cells.map((el, index) => {
                    return <Cell state={el} key={index}></Cell>
                })
            }
        </div>
    )
}
