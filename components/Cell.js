import React, {useState, useEffect} from 'react'
import cn from 'classnames'

export default function Cell({state, activePosition, row, cell, setFields, emit}) {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if(activePosition[0] === row && activePosition[1] === cell) {
            setActive(true)
        }

        if(active) {
            if(activePosition[0] !== row || activePosition[1] !== cell) {
                setFields(prev => {
                    let copy = [...prev]
                    copy[row][cell] = 2
                    return copy
                })
                emit({coords: [row, cell], win: 'pc'})
                setActive(false)
            }
        }
    }, [activePosition])

    const onClick = () => {
        if (active) {
            setFields(prev => {
                let copy = [...prev]
                copy[row][cell] = 1
                return copy
            })
            emit({coords: [row, cell], win: 'me'})
            setActive(false)
        }
    }

    return (
        <div 
            className={
                cn(
                    'cell', 
                    {
                        checked: state === 1, 
                        visit: state === 2, 
                        active: active
                    })
            } 
            onClick={onClick}
        >
        </div>
    )
}
