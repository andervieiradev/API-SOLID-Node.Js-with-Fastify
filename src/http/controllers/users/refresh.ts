import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  // TODO: salvar no banco de dados para invalidar futuramente
  const refreshToken = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // HTTPs
      sameSite: true, // CSRF
      httpOnly: true, // Front-end não tem acesso
    })
    .status(200)
    .send({
      token,
    })
}
