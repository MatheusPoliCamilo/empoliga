import { connectToDatabase } from '../../src/database'
import { userSchema } from '../../src/schemas/user'
import mongoose from 'mongoose'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json({ errors: [error] })
  })

  switch (request.method) {
    case 'GET': {
      const getCollection = await database.collection('users')
      const users = await getCollection.find({}).toArray()

      database.close()

      return response.status(200).json({ users })
    }
    case 'POST': {
      const User = mongoose.model('User', userSchema)

      User.create(request.body, (error, user) => {
        if (error) {
          return response.status(422).json({ errors: error })
        }

        return response.status(201).json(user)
      })

      break
    }
    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
