import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import jwt from 'jsonwebtoken'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      const token = request.cookies.token

      const id = jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
        if (error) {
          return response.status(401).json({ errors: { message: 'Token incorreto' } })
        }

        return decoded.id
      })

      const getCollection = await database.collection('users')
      const user = await getCollection.find({}).toArray()

      database.close()

      return response.status(200).json({})
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
