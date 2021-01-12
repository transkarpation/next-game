import React, { useState, useEffect } from 'react'
import Row from './Row'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GameTable({ size }) {
    const [activeCell, setActiveCell] = useState([-1, -1])

    const [space, setSpace] = useState([])

    useEffect(async () => {
        const initSpace = []
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                initSpace.push([i, j])
            }
        }

        await setSpace(initSpace)

        const interval = setInterval(() => {
            const index = getRandom(0, space.length - 1)
            setActiveCell(space[index])
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const index = getRandom(0, space.length - 1)
    //         setActiveCell(space[index])
    //     }, 1000)

    //     return () => clearInterval(interval)
    // })

    const removeFromSpace = (xy) => {
        setSpace(space.filter((el) => {
            return el.join() !== xy
        }))
    }

    return (
        <div className="game-table">
            {
                Array.from(Array(size)).map((el, index) => <Row removeFromSpace={removeFromSpace} activeCell={activeCell} size={size} rowIndex={index} key={index} />)
            }
        </div>
    )
}
