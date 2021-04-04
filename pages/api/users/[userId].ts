import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      const { userId } = request.query

      return User.findById(userId, (error, user) => {
        database.close()

        if (error) {
          return response.status(500).json(error)
        }

        if (!user) {
          return response.status(422).json({ erros: { message: 'Usuário não encontrado' } })
        }

        return response.status(200).json(user)
      })
    }

    case 'PATCH': {
      const { userId } = request.query
      const condition = { _id: userId }
      const update = request.body
      const options = { new: true }

      return User.findOneAndUpdate(condition, update, options, (error, user) => {
        database.close()

        if (error) {
          return response.status(500).json(error)
        }

        if (!user) {
          return response.status(422).json({ erros: { message: 'Usuário não encontrado' } })
        }

        return response.status(200).json(user)
      })
    }

    case 'PUT': {
      const { userId } = request.query
      const condition = { _id: userId }
      const update = request.body
      const options = { new: true }

      return User.findOneAndReplace(condition, update, options, (error, user) => {
        database.close()

        if (error) {
          return response.status(500).json(error)
        }

        if (!user) {
          return response.status(422).json({ erros: { message: 'Usuário não encontrado' } })
        }

        return response.status(200).json(user)
      })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
