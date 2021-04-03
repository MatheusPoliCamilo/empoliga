import { connectToDatabase } from '../../src/database'

enum Genre {
  male,
  female,
  other
}

enum Role {
  top,
  jungle,
  mid,
  adCarry,
  support,
  coach,
  analyst,
  caster,
  commentator
}

interface User {
  id: number,
  firstName: string,
  lastName: string,
  genre: Genre,
  birthDate: Date,
  email: string,
  whatsapp: string,
  twitter: string,
  twitch: string,
  instagram: string,
  facebook: string,
  lolNickname: string,
  role: Role
}

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json({ errors: [error] })
  })

  switch (request.method) {
    case 'GET': {
      const getCollection = await database.collection('users')
      const users: Array<User> = await getCollection.find({}).toArray()

      database.close()

      return response.status(200).json({ users })
    }
    case 'POST': {
      database.close()
      return response.status(404).json({})
    }
    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
