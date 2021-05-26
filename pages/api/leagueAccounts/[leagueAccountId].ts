import { connectToDatabase } from '../../../src/database'
import { LeagueAccount } from '../../../src/schemas/leagueAccount'
import jwt from 'jsonwebtoken'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'PATCH': {
      const token = request.cookies.token
      const { error, decoded } = jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
        return { error, decoded }
      })

      if (error) return response.status(401).json({ errors: { message: 'Usuário não autenticado' } })

      const { leagueAccountId } = request.query

      if (!decoded.id) return response.status(401).json({ errors: { message: 'Usuário não autenticado' } })

      // if (decoded.id !== userId) {
      //   return response.status(200).json({ errors: { message: 'Tentativa de alteração de usuário não autenticado' } })
      // }

      const update = request.body
      const options = { new: true }

      return LeagueAccount.findByIdAndUpdate(leagueAccountId, update, options, (error, leagueAccount) => {
        database.close()

        if (error) {
          return response.status(500).json(error)
        }

        if (!leagueAccount) {
          return response.status(422).json({ erros: { message: 'Conta não encontrada' } })
        }

        return response.status(200).json(leagueAccount)
      })
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
