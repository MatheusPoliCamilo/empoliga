import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { LeagueAccount } from '../../../src/schemas/leagueAccount'
import { verifyAuthentication } from '../../../src/verifyAuthentication'
import jwt from 'jsonwebtoken'
import { Team } from '../../../src/schemas/team'
import { Player } from '../../../src/schemas/player'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      const { teamId } = request.query

      return Team.findById(teamId)
        .populate({ path: 'captain', model: User })
        .populate({
          path: 'players',
          model: User,
          populate: {
            path: 'player',
            model: User,
            populate: {
              path: 'player',
              model: Player,
              populate: { path: 'leagueAccounts', model: LeagueAccount },
            },
          },
        })
        .exec((error, team) => {
          database.close()

          if (error) {
            return response.status(500).json(error)
          }

          if (!team) {
            return response.status(422).json({ erros: { message: 'Time não encontrado' } })
          }

          return response.status(200).json(team)
        })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
