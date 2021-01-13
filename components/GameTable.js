import React, { useState, useEffect, useRef } from 'react'
import Row from './Row'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function generate2Dmatrix(size) {
    let matrix = []

    for(let i=0; i<size; i++) {
        matrix.push([])
        for(let j=0; j<size; j++) {
            matrix[i].push(0)
        }
    }

    return matrix
}

export default function GameTable({ size }) {

    const initFields = generate2Dmatrix(size)

    const availableSpacesInit = () => {
        const result = []
        for (let i = 0; i < initFields.length; i++) {
            for (let j = 0; j < initFields[i].length; j++) {
                if (initFields[i][j] === 0) {
                    result.push([i, j])
                }
            }
        }
        return result
    }

    const [fields, setFields] = useState(initFields)
    const [activePosition, setActivePosition] = useState([-1, -1])
    const [availableSpace, setAvailableSpace] = useState(availableSpacesInit())
    const [gameCount, setGameCount] = useState({ me: 2, pc: 2 })
    const [gameRunning, setGameRunning] = useState(false)

    const emit = (arg) => {
        setAvailableSpace(prev => {
            let copy = prev.filter(el => {
                return el.join() !== arg.coords.join()
            })
            return copy
        })
        setGameCount(prev => {
            if (arg.win === 'me') {
                return {
                    ...prev,
                    me: prev.me + 1
                }
            }
            if (arg.win === 'pc') {
                return {
                    ...prev,
                    pc: prev.pc + 1
                }
            }
        })
    }

    useEffect(() => {
        const fields = size * size / 2
        if (gameCount.pc > fields) {
            console.log('pc wins')
            setGameRunning(false)
        }

        if (gameCount.me > fields) {
            console.log('me wins')
            setGameRunning(false)
        }
    }, [gameCount])

    useInterval(() => {
        let randomIndex = getRandom(0, availableSpace.length - 1)
        let coords = availableSpace[randomIndex]

        setActivePosition([coords[0], coords[1]])
    }, gameRunning ? 1000 : null);

    return (
        <>
            <div className="game-table">
                {
                    fields.map((el, index) => <Row setFields={setFields} emit={emit} setAvailableSpace={setAvailableSpace} activePosition={activePosition} cells={el} row={index} key={index} />)
                }
            </div>
            <div>
                <button onClick={() => setGameRunning(true)}>start</button>
                <p>me: {gameCount.me}</p>
                <p>pc: {gameCount.pc}</p>
            </div>
        </>

    )
}