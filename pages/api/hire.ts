import { connectToDatabase } from '../../src/database'
import { User } from '../../src/schemas/user'
import { Team } from '../../src/schemas/team'
import jwt from 'jsonwebtoken'

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

      const { captain, playerToHire } = request.body

      if (decoded.id !== captain) return response.status(401).json({ errors: { message: 'Erro de autenticação' } })

      const player = await User.findById(playerToHire)
      if (!player) return response.status(401).json({ errors: { message: 'Jogador não encontrado' } })

      const team = await Team.findOne({ captain: captain }).exec()

      if (!team) return response.status(401).json({ errors: { message: 'Time não encontrado' } })

      player.teamInvites.push(team)
      const newPlayer = await player.save()

      team.invites.push(player)
      await team.save()

      return response.status(202).json({ newPlayer })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
