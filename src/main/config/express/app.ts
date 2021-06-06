import express from 'express'
import swaggerSetup from './swagger-setup'
import middlewaresSetup from './middlewares-setup'
import routesSetup from './routes-setup'

const app = express()
swaggerSetup(app)
middlewaresSetup(app)
routesSetup(app)
export default app
