import mongoose from 'mongoose'

let client = null

async function connectToDatabase(uri) {
  client = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  return client.connection
}

export { connectToDatabase }
