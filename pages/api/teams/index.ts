import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { TeamPlayer } from '../../../src/schemas/teamPlayer'
import { Team } from '../../../src/schemas/team'
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
      const teams = await Team.find({})
        .populate({
          path: 'captain',
          populate: { path: 'player', model: Player, populate: { path: 'leagueAccounts', model: LeagueAccount } },
        })
        .populate({
          path: 'players',
          model: TeamPlayer,
          populate: {
            path: 'player',
            model: User,
            populate: { path: 'player', model: Player, populate: { path: 'leagueAccounts', model: LeagueAccount } },
          },
        })
        .exec()

      // database.close()

      return response.status(200).json({ teams })
    }

    case 'POST': {
      const token = request.cookies.token
      const { error, decoded } = jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
        return { error, decoded }
      })

      if (error) return response.status(401).json({ errors: { message: 'Usuário não autenticado' } })
      if (!decoded.id) return response.status(401).json({ errors: { message: 'Usuário não autenticado' } })

      const { name, acronym, captain, logo } = request.body

      if (decoded.id !== captain)
        return response
          .status(401)
          .json({ errors: { message: 'Tentativa de criação de time no nome de outro jogador' } })

      const teamPlayer = await TeamPlayer.create({ player: captain, firstString: true })

      if (!teamPlayer) {
        database.close()
        return response.status(422).json({ errors: { message: 'Erro na criação do time' } })
      }

      const team = await Team.create({ name, acronym, captain, logo })

      if (!team) {
        database.close()
        return response.status(422).json({ errors: { message: 'Erro ao criar o time' } })
      }

      team.players.push(teamPlayer)
      await team.save()

      const user = await User.findById(captain).exec()

      if (!user) {
        database.close()
        return response.status(422).json({ errors: { message: 'Usuário não encotrado' } })
      }

      user.teams.push(team)
      await user.save()

      database.close()
      return response.status(201).json({ team })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
