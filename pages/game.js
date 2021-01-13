import React, {useEffect, useState} from 'react'
import GameTable from '../components/GameTable'

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Game() {
    const size = 10

    return (
        <GameTable size={size} />
    )
}
