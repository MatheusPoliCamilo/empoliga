import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { verifyAuthentication } from '../../../src/verifyAuthentication'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      // TODO: Retornar informações sensíveis somente se estiver autenticado ou se for um juíz
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
      const id = verifyAuthentication(request, response)
      const { userId } = request.query

      if (!id) return

      if (id !== userId) {
        return response.status(200).json({ errors: { message: 'Tentativa de alteração de usuário não autenticado' } })
      }

      const update = request.body
      const options = { new: true }

      return User.findByIdAndUpdate(userId, update, options, (error, user) => {
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

    // case 'DELETE': {
    //   const { userId } = request.query
    //   const condition = { _id: userId }

    //   return User.findOneAndDelete(condition, {}, (error, user) => {
    //     database.close()

    //     if (error) {
    //       return response.status(500).json(error)
    //     }

    //     if (!user) {
    //       return response.status(422).json({ erros: { message: 'Usuário não encontrado' } })
    //     }

    //     return response.status(200).json(user)
    //   })
    // }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
