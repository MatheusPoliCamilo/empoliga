import { Request, Response } from 'express';

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://empoliga:<password>@southamerica-east1-0.pcdng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

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

const users: Array<User> = []

class UserController {
  async index(request: Request, response: Response) {
    return response.json(users)
  }

  async new(request: Request, response: Response) {
    const user: User = {
      id: null,
      firstName: '',
      lastName: '',
      genre: 0,
      birthDate: new Date(),
      email: '',
      whatsapp: '',
      twitter: '',
      twitch: '',
      instagram: '',
      facebook: '',
      lolNickname: '',
      role: 0
    }

    return response.json(user)
  }

  async show(request: Request, response: Response) {
    const userId = parseInt(request.params.userId)
    response.json(users.find(user => user.id === userId))
  }

  async create(request: Request, response: Response) {
    const user = request.body.user;
    users.push(user);
    response.json('Usuário criado com sucesso!')
  }

  async update(request: Request, response: Response) {
  }
}

export { UserController }
