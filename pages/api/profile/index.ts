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
      const token = request.cookies.token

      const { error, decoded } = jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
        return { error, decoded }
      })

      if (error) {
        return response.status(401).json({ errors: { message: 'Token incorreto' } })
      }

      const id = decoded.id

      return User.findById(id)
        .select('+whatsapp')
        .exec(async (error, user) => {
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
            user = await user.save()
          }

          let player = await Player.findById(user.player).select('+address +setupPhoto')

          if (player.leagueAccounts.length === 0) {
            const leagueAccount = await LeagueAccount.create({})
            leagueAccount.player = player.id
            await leagueAccount.save()

            player.leagueAccounts.push(leagueAccount.id)
            player = await player.save()
          }

          const leagueAccounts = await Promise.all(
            player.leagueAccounts.map(async (id) => {
              return await LeagueAccount.findById(id)
            })
          )

          database.close()

          return response.status(200).json({ ...user._doc, player: { ...player._doc, leagueAccounts } })
        })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
