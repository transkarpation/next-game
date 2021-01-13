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

const availableSpacesInit = (fields) => {
    const result = []
    for (let i = 0; i < fields.length; i++) {
        for (let j = 0; j < fields[i].length; j++) {
            if (fields[i][j] === 0) {
                result.push([i, j])
            }
        }
    }
    return result
}

export default function GameTable({ mode, setStart, setMessage, username }) {

    // const initFields = generate2Dmatrix(size)
    const [fields, setFields] = useState([])
    const [activePosition, setActivePosition] = useState([-1, -1])
    const [availableSpace, setAvailableSpace] = useState([])
    const [gameCount, setGameCount] = useState({ me: 0, pc: 0 })

    useEffect(() => {
        if(mode) {
            console.log(mode)
            setFields(() => generate2Dmatrix(mode.field))
        }

    }, [mode])

    useEffect(() => {
        if(fields.length) {
            setAvailableSpace(() => availableSpacesInit(fields))
        }
    }, [fields])

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
        const size = mode.field
        const fields = size * size / 2
        if (gameCount.pc > fields) {
            console.log('pc wins')
            setStart(false)
            setMessage('pc wins')
        }

        if (gameCount.me > fields) {
            setStart(false)
            setMessage(`${username} wins`)
            fetch('/api/winners', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    winner: username,
                    date: Date.now()
                }),
            }).then(() => {
                console.log('saved')
            })
        }
    }, [gameCount])

    useInterval(() => {
        let randomIndex = getRandom(0, availableSpace.length - 1)
        let coords = availableSpace[randomIndex]

        setActivePosition([coords[0], coords[1]])
    }, mode.delay);

    return (
        <>
            <div className="game-table">
                {
                    fields.map((el, index) => <Row setFields={setFields} emit={emit} setAvailableSpace={setAvailableSpace} activePosition={activePosition} cells={el} row={index} key={index} />)
                }
            </div>
            <div>
                <p>me: {gameCount.me}</p>
                <p>pc: {gameCount.pc}</p>
            </div>
        </>

    )
}