import React, {useEffect, useState} from 'react'
import GameTable from '../components/GameTable'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Game() {
    const size = 10
    const gameModes = {
        easyMode: {
            delay: 2000,
            field: 5
        },
        hardMode: {
            delay: 900,
            field: 15
        },
        normalMode: {
            delay: 1000,
            field: 10
        }
    }

    const [currentMode, setCurrentMode] = useState('easyMode')

    const onSelect = (e) => {
        setCurrentMode(e.target.value)
    }

    return (
        <>
            <select onChange={onSelect}>
                <option value="easyMode">easyMode</option>
                <option value="hardMode">hardMode</option>
                <option value="normalMode">normalMode</option>
            </select>
            <div>
                <GameTable mode={gameModes[currentMode]} />
            </div>
        </>

    )
}
