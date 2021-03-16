import { Request, Response } from 'express';

class UserController {
  async show(request: Request, response: Response) {
    console.log(request.body)
    return response.json([{id: 1, name: 'First user'}])
  }
}

export { UserController }
