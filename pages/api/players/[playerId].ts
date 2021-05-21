import { connectToDatabase } from '../../../src/database'

export default async (request, response) => {
  const database = await connectToDatabase(process.env.MONGODB_URI)

  database.on('error', (error) => {
    return response.status(500).json(error)
  })

  switch (request.method) {
    case 'GET': {
      console.log()
      break
    }

    default: {
      database.close()
      return response.status(404).json({})
    }
  }
}
