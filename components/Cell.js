import React, {useState, useEffect} from 'react'
import cn from 'classnames'

export default function Cell(props) {
    const [active, setActive] = useState(false)
    const [red, setRed] =  useState(false)

    useEffect(() => {
        if (props.active) {
            console.log('props.active watch')
            setTimeout(() => {
                setRed(true)
            }, props.delay)
        }
    })

    const onClick = () => {

    }
    return (
        <div className={cn('cell', {blue: props.active, red: red})} onClick={onClick}>
        </div>
    )
}
