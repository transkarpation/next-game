import React, { useState, useEffect, useRef } from 'react'
import Row from './Row'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GameTable({ size }) {
    const initFields = [
        [1, 0, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 0, 1]
    ]

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
    const [activePosition, setActivePosition] = useState([1, 1])
    const [availableSpace, setAvailableSpace] = useState(availableSpacesInit())
    const [gameCount, setGameCount] = useState({ me: 2, pc: 2 })
    const [gameInterval, setGameInterval] = useState(null)

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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         let randomIndex = getRandom(0, availableSpace.length - 1)
    //         let coords = availableSpace[randomIndex]

    //         setActivePosition([coords[0], coords[1]])
    //     }, 1000)

    //     if (!gameInterval) {
    //         setGameInterval(interval)
    //     }


    //     return () => clearInterval(interval)
    // })

    useEffect(() => {
        const fields = size * size / 2
        if (gameCount.pc > fields) {
            console.log('pc wins')
            console.log(gameInterval)
            clearInterval(gameInterval)
        }
    }, [gameCount])

    useInterval(() => {
        let randomIndex = getRandom(0, availableSpace.length - 1)
        let coords = availableSpace[randomIndex]

        setActivePosition([coords[0], coords[1]])
    }, 1000);

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