import React from 'react'
import Cell from '../components/Cell'
import Row from '../components/Row'

export default function Game() {
    const size = 4;
    return (
        <div>
            {
                Array.from(Array(size)).map((el, index) => {
                    return <Row amount={size} key={index} />
                })
            }
        </div>
    )
}
