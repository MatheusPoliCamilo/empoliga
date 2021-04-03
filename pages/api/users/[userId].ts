import { connectToDatabase } from '../../../src/database'
import { userSchema } from '../../../src/schemas/user'
import mongoose from 'mongoose'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      const { userId } = request.query
      const User = mongoose.model('User', userSchema)

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

    // case 'POST': {}
  }
}
