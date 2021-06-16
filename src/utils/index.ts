import { getConnection, Connection } from 'typeorm'
export const getEnvConnection = (): Connection => getConnection()
