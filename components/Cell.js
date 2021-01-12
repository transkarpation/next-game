import React, {useState, useEffect} from 'react'
import cn from 'classnames'

export default function Cell({state}) {
    const onClick = () => {
        if(state !== 3) {
            return;
        }
        console.log('click action')
    }

    return (
        <div className={cn('cell', {checked: state === 1, visit: state === 2, active: state === 3})} onClick={onClick}>
        </div>
    )
}
