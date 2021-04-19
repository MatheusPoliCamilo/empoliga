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
      // TODO: Remover informações sensíveis do index de usuários
      const getCollection = await database.collection('users')
      const users = await getCollection.find({}).toArray()

      database.close()

      return response.status(200).json({ users })
    }

    case 'POST': {
      return await User.create(request.body, (errors, user) => {
        database.close()
        user.password = undefined

        if (errors) {
          return response.status(422).json(errors)
        } else {
          const oneDay = 86400
          const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, { expiresIn: oneDay })

          return response.status(201).json({ user, token })
        }
      })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
