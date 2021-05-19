import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { Player } from '../../../src/schemas/player'
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

      return User.findById(id, async (error, user) => {
        if (error) {
          database.close()
          return response.status(500).json(error)
        }

        if (!user) {
          database.close()
          return response.status(422).json({ erros: { message: 'Usuário não encontrado' } })
        }

        if (!user.player) {
          const player = await Player.create({ valid: false })
          user.player = player.id
          player.user = user.id
          await player.save()
          await user.save()

          database.close()
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
