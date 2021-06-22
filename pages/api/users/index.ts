import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { Player } from '../../../src/schemas/player'
import { Team } from '../../../src/schemas/team'
import { LeagueAccount } from '../../../src/schemas/leagueAccount'
import jwt from 'jsonwebtoken'

function rankWeigth(rank) {
  switch (rank) {
    case 'I':
      return 0.4
    case 'II':
      return 0.3
    case 'III':
      return 0.2
    case 'IV':
      return 0.1
    default:
      return 0
  }
}

function calculateWeigth(rank, leaguePoints) {
  return rankWeigth(rank) + (leaguePoints ? leaguePoints / 1000 : 0)
}

function eloWeigth(elo, rank, leaguePoints) {
  switch (elo) {
    case 'CHALLENGER':
      return 11 + calculateWeigth(rank, leaguePoints)
    case 'GRANDMASTER':
      return 10 + calculateWeigth(rank, leaguePoints)
    case 'MASTER':
      return 9 + calculateWeigth(rank, leaguePoints)
    case 'DIAMOND':
      return 8 + calculateWeigth(rank, leaguePoints)
    case 'PLATINUM':
      return 7 + calculateWeigth(rank, leaguePoints)
    case 'GOLD':
      return 6 + calculateWeigth(rank, leaguePoints)
    case 'SILVER':
      return 5 + calculateWeigth(rank, leaguePoints)
    case 'BRONZE':
      return 4 + calculateWeigth(rank, leaguePoints)
    case 'IRON':
      return 3 + calculateWeigth(rank, leaguePoints)
    case 'UNRANKED':
      return 2 + calculateWeigth(rank, leaguePoints)
    default:
      return 1 + calculateWeigth(rank, leaguePoints)
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
          const userNickname = user.player?.leagueAccounts[0]?.nickname

          if (userNickname) {
            return userNickname.toLowerCase().includes(nickname.toLowerCase())
          }

          return false
        })
      }

      const usersSortedByElo = users.sort((user, anotherUser) => {
        const userAccount = user.player?.leagueAccounts[0]
        const anotherUserAccount = anotherUser.player?.leagueAccounts[0]

        const userElo = eloWeigth(userAccount?.tier, userAccount?.rank, userAccount?.leaguePoints)
        const anotherUserElo = eloWeigth(
          anotherUserAccount?.tier,
          anotherUserAccount?.rank,
          anotherUserAccount?.leaguePoints
        )

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
