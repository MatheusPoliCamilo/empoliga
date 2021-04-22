import bcryptjs from 'bcryptjs'
import { connectToDatabase } from '../../src/database'
import { User } from '../../src/schemas/user'
import jwt from 'jsonwebtoken'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  return await User.findOne({ email: request.body.email })
    .select('+password')
    .exec((error, user) => {
      database.close()

      if (error) {
        return response.status(400).json(error)
      }

      if (!user) {
        return response.status(400).json({ errors: { message: 'E-mail não cadastrado' } })
      }

      bcryptjs.compare(request.body.password, user.password, function (error, bcryptjsResponse) {
        if (error) {
          return response.status(400).json(error)
        }
        if (bcryptjsResponse) {
          user.password = undefined

          const oneDay = 86400
          const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, { expiresIn: oneDay })

          response.status(200).json({ user, token })
        } else {
          return response.status(400).json({ errors: { message: 'Senha inválida' } })
        }
      })
    })
}
