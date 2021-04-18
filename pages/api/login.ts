import bcryptjs from 'bcryptjs'
import { connectToDatabase } from '../../src/database'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  const userCollection = await database.collection('users')

  return await userCollection.findOne({ email: request.body.email }, (error, user) => {
    if (error) {
      return response.status(500).json(error)
    }

    bcryptjs.compare(request.body.password, user.password, function (error, response) {
      if (error) {
        console.log('handle error', error)
      }
      if (response) {
        console.log('Send JWT', response)
      } else {
        return response.json({ error: { message: 'Senha inválida' } })
      }
    })
  })
}
