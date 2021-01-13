import dbConnect from '../../../utils/dbConnect'
import Winner from '../../../models/Winner'


export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const winners = await Winner.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: winners })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const winner = await Winner.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: winner })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
