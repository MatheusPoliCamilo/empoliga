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
  async new (_request, response) {
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

  async show (request, response) {
    const userId = parseInt(request.params.userId)
    response.json(users.find(user => user.id === userId))
  }

  async create (request, response) {
    const user = request.body.user
    users.push(user)
    response.json('Usuário criado com sucesso!')
  }
}

export { UserController }
