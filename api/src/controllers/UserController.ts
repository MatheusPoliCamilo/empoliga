import { Request, Response } from 'express';

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://empoliga:<password>@southamerica-east1-0.pcdng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

class UserController {
  async show(request: Request, response: Response) {
    console.log(request.body)
    return response.json([{id: 1, name: 'First user'}])
  }
}

export { UserController }
