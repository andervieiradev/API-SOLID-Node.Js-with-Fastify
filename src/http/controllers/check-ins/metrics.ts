import { makeGetUsersMetricsUseCase } from '@/use-cases/factories/make-get-users-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUsersMetricsUseCase = makeGetUsersMetricsUseCase()

  const { checkInsCount } = await getUsersMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
