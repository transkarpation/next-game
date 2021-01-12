import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Cell from '../components/Cell'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Row(props) {
    return (
        <div className={cn('row')}>
            {
                Array.from(new Array(props.size)).map((el, index) => {
                    return <Cell  {...props} cellIndex={index} key={index}></Cell>
                })
            }
        </div>
    )
}
