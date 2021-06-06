import { RepositoryType, CommonRepositoryType } from '@/infrastructure/common/repositories'
import {
  DeleteSessionByAccountIdRepository
} from '@/data/auth/repositories'
import { SessionRepositoryMemory } from './memory'
import { SessionRepositoryTypeORM } from './typeorm'
import { SessionModel } from '@/domain/auth'

export type SessionRepositoryType =
CommonRepositoryType<SessionModel> |
DeleteSessionByAccountIdRepository

export const getSessionRepository = (repositoryType: RepositoryType): SessionRepositoryType => {
  switch (repositoryType) {
    case RepositoryType.Memory:
      return SessionRepositoryMemory.getRepository()
    case RepositoryType.TypeOrm:
      return new SessionRepositoryTypeORM()
  }
}
