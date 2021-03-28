import url from 'url'
import { MongoClient } from 'mongodb'

let client = null

async function connectToDatabase (uri) {
  client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  return await client.db(url.parse(uri).pathname.substr(1))
}

export { connectToDatabase, client }
