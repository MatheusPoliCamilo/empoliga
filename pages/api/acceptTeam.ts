import { connectToDatabase } from '../../src/database'
import { User } from '../../src/schemas/user'
import { Team } from '../../src/schemas/team'
import jwt from 'jsonwebtoken'
import { TeamPlayer } from '../../src/schemas/teamPlayer'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'POST': {
      const token = request.cookies.token
      const { error, decoded } = jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
        return { error, decoded }
      })

      if (error) return response.status(401).json({ errors: { message: 'Usuário não autenticado' } })
      if (!decoded.id) return response.status(401).json({ errors: { message: 'Usuário não autenticado' } })

      const { playerId, teamId } = request.body

      if (decoded.id !== playerId) return response.status(401).json({ errors: { message: 'Erro de autenticação' } })

      const player = await User.findById(playerId).exec()
      if (!player) return response.status(401).json({ errors: { message: 'Jogador não encontrado' } })

      const team = await Team.findById(teamId).exec()
      if (!team) return response.status(401).json({ errors: { message: 'Time não encontrado' } })

      // eslint-disable-next-line eqeqeq
      const playerTeamInvites = player.teamInvites.filter((teamInvite) => teamInvite != team.id)
      player.teamInvites = playerTeamInvites
      player.teams.push(team)
      const newPlayer = await player.save()

      const teamPlayer = await TeamPlayer.create({ player: newPlayer, firstString: team.players.length < 4 })

      team.players.push(teamPlayer)
      // eslint-disable-next-line eqeqeq
      const teamInvites = team.invites.filter((user) => user != player.id)
      team.invites = teamInvites
      await team.save()

      return response.status(202).json({ newPlayer })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
