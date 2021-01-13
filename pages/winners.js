import React from 'react'
import dbConnect from '../utils/dbConnect'
import Winner from '../models/Winner'
import Link from 'next/link'

export default function Winners({ winners }) {
    return (
        <div className="winners">
            <div>
                <Link href="/">
                    <a>Go Back</a>
                </Link>
                <h2>Leader Board</h2>
                {
                    winners.map(el => {
                        return (
                            <div className="row" key={el._id}>
                                <div className="name">{el.winner}</div>
                                <div>{el.date}</div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export async function getServerSideProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Winner.find({})
    const winners = result.map((doc) => {
      const winner = doc.toObject()
      winner._id = winner._id.toString()
      winner.date = winner.date.toLocaleString()
      return winner
    })
  
    return { props: { winners: winners } }
  }
