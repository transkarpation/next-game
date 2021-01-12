import React, { useState, useEffect } from 'react'
import Row from './Row'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GameTable({ size }) {
    const initFields = [
        [1, 0, 2, 0],
        [0, 3, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 0, 1]
    ]

    const [fields, setFields] = useState(initFields)
    const [activePosition, setActivePosition] = useState([1, 1])

    useEffect(() => {
        setInterval(() => {
            let row = getRandom(0, 3)
            let col = getRandom(0, 3)

            if (fields[row][col]  === 0) {
               setFields((oldState) => {
                   let copy = [...oldState]
                   copy[activePosition[0]][activePosition[1]] = 2
                   copy[row][col] = 3
                   return copy
               })
            }
        }, 1000)
    }, [])

    return (
        <div className="game-table">
            {
                fields.map((el, index) => <Row cells={el} key={index} />)
            }
        </div>
    )
}