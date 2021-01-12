import React from 'react'
import Cell from '../components/Cell'

export default function Row(props) {
    return (
        <div className="row">
            {
                Array.from(new Array(props.amount)).map((el, index) => {
                    return <Cell key={index}></Cell>
                })
            } 
        </div>
    )
}
