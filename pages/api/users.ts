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

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
export default async (_request, response) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGODB_URI)

  // Select the "users" collection from the database
  const collection = await db.collection('users')

  // Select the users collection from the database
  const users: Array<User> = await collection.find({}).toArray()

  // Respond with a JSON string of all users in the collection
  return response.status(200).json({ users })
}
