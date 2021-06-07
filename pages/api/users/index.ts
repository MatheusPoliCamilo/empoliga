import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { Player } from '../../../src/schemas/player'
import { LeagueAccount } from '../../../src/schemas/leagueAccount'
import jwt from 'jsonwebtoken'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      // TODO: Remover informações sensíveis do index de usuários
      const { nickname } = request.query

      let users = await User.find({})
        .populate({ path: 'player', populate: { path: 'leagueAccounts', model: LeagueAccount } })
        .exec()

      if (nickname) {
        users = users.filter((user) => {
          return user.player?.leagueAccounts[0]?.nickname === nickname
        })
      }

      database.close()

      return response.status(200).json({ users })
    }

    case 'POST': {
      const player = await Player.create({ valid: false })

      return await User.create({ ...request.body, player: player.id }, async (errors, user) => {
        if (errors) {
          database.close()
          return response.status(422).json(errors)
        } else {
          user.password = undefined

          const oneDay = 86400
          const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, { expiresIn: oneDay })

          player.user = user
          await player.save()
          database.close()

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
