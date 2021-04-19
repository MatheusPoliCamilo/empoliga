import jwt from 'jsonwebtoken'

function verifyAuthentication(request, response) {
  const authenticationToken = request.headers.authorization

  if (!authenticationToken) {
    return response.status(401).json({ errors: { message: 'Usuário não autenticado' } })
  }

  const parts = authenticationToken.split(' ')

  if (parts.length !== 2) {
    return response.status(401).json({ errors: { message: 'Token inválido' } })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ errors: { message: 'Token mal formado' } })
  }

  return jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
    if (error) {
      return response.status(401).json({ errors: { message: 'Token incorreto' } })
    }

    return decoded.id
  })
}

export { verifyAuthentication }
