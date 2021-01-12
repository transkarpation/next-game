import React, {useState, useEffect} from 'react'
import cn from 'classnames'

export default function Cell(props) {
    const [active, setActive] = useState(false)
    const [checked, setChecked] = useState(false)
    const [visit, setVisit] = useState(false)

    useEffect(async () => {
        if (props.activeCell && props.activeCell[0] === props.rowIndex && props.activeCell[1] === props.cellIndex) {
            await setActive(true)
        } else {
            if (active) {
                await setVisit(true)
                await setActive(false)
                props.removeFromSpace(`${props.rowIndex},${props.cellIndex}`)
            }
        }
    })

    const onClick = () => {
        if (active) {
            setActive(false)
            setVisit(false)
            setChecked(true)
            props.removeFromSpace(`${props.rowIndex},${props.cellIndex}`)
        }
    }

    return (
        <div className={cn('cell', {active: active, checked: checked, visit: visit})} onClick={onClick}>
        </div>
    )
}
