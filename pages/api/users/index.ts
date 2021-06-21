import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { Player } from '../../../src/schemas/player'
import { Team } from '../../../src/schemas/team'
import { LeagueAccount } from '../../../src/schemas/leagueAccount'
import jwt from 'jsonwebtoken'

function eloWeigth(elo) {
  switch (elo) {
    case 'CHALLENGER':
      return 11
    case 'GRANDMASTER':
      return 10
    case 'MASTER':
      return 9
    case 'DIAMOND':
      return 8
    case 'PLATINUM':
      return 7
    case 'GOLD':
      return 6
    case 'SILVER':
      return 5
    case 'BRONZE':
      return 4
    case 'IRON':
      return 3
    case 'UNRANKED':
      return 2
    default:
      return 1
  }
}

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
        .populate({ path: 'teams', model: Team })
        .sort({ name: 'ascending' })
        .exec()

      if (nickname) {
        users = users.filter((user) => {
          return user.player?.leagueAccounts[0]?.nickname === nickname
        })
      }

      const usersSortedByElo = users.sort((user, anotherUser) => {
        const userElo = eloWeigth(user.player?.leagueAccounts[0]?.tier)
        const anotherUserElo = eloWeigth(anotherUser.player?.leagueAccounts[0]?.tier)

        return anotherUserElo - userElo
      })

      database.close()

      return response.status(200).json({ users: usersSortedByElo })
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
