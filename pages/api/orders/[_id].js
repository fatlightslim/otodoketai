import { connectToDatabase } from "../../../utils/mongodb"
import { ObjectId } from "mongodb"


export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  const _id = req.query._id
  const r = 
  db.collection("orders").findOne({_id: ObjectId(_id)}, (err, r) => {
    if (err) console.log(err)

    res.json(r)
  })
}