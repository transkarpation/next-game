import React, { useEffect, useState } from 'react'
import GameTable from '../components/GameTable'
import Link from 'next/link'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

export default function Game() {

    const [currentMode, setCurrentMode] = useState('easyMode')
    const [username, setUsername] = useState('')
    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')

    const onSelect = (e) => {
        setCurrentMode(e.target.value)
    }

    return (
        <div className="game">
            <div>
                <Link href="/winners">
                    <a>Game winners</a>
                </Link>
            </div>
            <div className="game-settings">
                <select disabled={start} className="game-mode control mr-10" onChange={onSelect}>
                    <option value="easyMode">easyMode</option>
                    <option value="hardMode">hardMode</option>
                    <option value="normalMode">normalMode</option>
                </select>
                <input disabled={start} onChange={(e) => setUsername(e.target.value)} value={username} className="control mr-10" type="text" placeholder="Enter your name"></input>
                <button onClick={() => setStart(true)} disabled={(username.length ? false : true) || start} className="control">
                    {
                        message ? 'PLAY AGAIN' : 'PLAY'
                    }
                </button>
            </div>
            {
                message ? <p>{message}</p> : null
            }
            <div>
                {
                    start ? <GameTable setMessage={setMessage} username={username} setStart={setStart} mode={gameModes[currentMode]} /> : null
                }

            </div>
        </div>

    )
}
