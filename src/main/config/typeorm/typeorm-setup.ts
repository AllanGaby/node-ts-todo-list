import { createConnection, Connection } from 'typeorm'

export const typeOrmSetup = async (): Promise<Connection> => {
  return await createConnection()
}
