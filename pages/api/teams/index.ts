import { connectToDatabase } from '../../../src/database'
import { User } from '../../../src/schemas/user'
import { TeamPlayer } from '../../../src/schemas/teamPlayer'
import { Team } from '../../../src/schemas/team'
import jwt from 'jsonwebtoken'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    // case 'GET': {
    //   const { nickname } = request.query

    //   let users = await User.find({})
    //     .populate({ path: 'player', populate: { path: 'leagueAccounts', model: LeagueAccount } })
    //     .exec()

    //   if (nickname) {
    //     users = users.filter((user) => {
    //       return user.player?.leagueAccounts[0].nickname === nickname
    //     })
    //   }

    //   database.close()

    //   return response.status(200).json({ users })
    // }

    case 'POST': {
      const { name, acronym, captain, logo } = request.body

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
