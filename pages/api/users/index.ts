import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      const getCollection = await database.collection('users')
      const users = await getCollection.find({}).toArray()

      database.close()

      return response.status(200).json({ users })
    }

    case 'POST': {
      return await User.create(request.body, (errors, user) => {
        database.close()

        if (errors) {
          return response.status(422).json(errors)
        } else {
          return response.status(201).json(user)
        }
      })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
