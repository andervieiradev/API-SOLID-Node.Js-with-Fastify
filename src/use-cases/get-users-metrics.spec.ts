import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-users-metrics'

let checkInsReposity: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsReposity = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsReposity)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsReposity.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await checkInsReposity.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
