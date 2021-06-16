import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as dotenv from 'dotenv'

import swagger from './config/swagger'
import { Server } from 'net'
import { useExpressServer } from 'routing-controllers'
import { EventsController } from './controller/Events'
import { PlacesController } from './controller/Places'
import { ActivitiesController } from './controller/Activities'

export default class App {
  private app: express.Application
  private server: Server

  public async getApp(): Promise<any> {
    await this.init()
    return this.app
  }

  public async run(): Promise<any> {
    await this.init()
    dotenv.config()
    /**
     * START the server
     */
    this.server = this.app.listen(process.env.PORT, function () {
      console.log(`The server is listening to port ${process.env.PORT} in '${process.env.NODE_ENV}' mode`)
    })
  }

  public async init(NODE_ENV: string = 'development', PORT: number = 3000): Promise<express.Application> {
    /**
     * Create our app w/ express
     */
    this.app = express()

    /**
     * HELMET
     */
    this.app.use(helmet())

    /**
     * CORS
     */
    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders:
        'Content-Type, authorization,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token',
      preflightContinue: true,
    }
    this.app.use(cors(corsOptions))

    /**
     * LOGGING
     */
    this.app.use(morgan('combined'))

    /**
     * Body parsers and methods
     */
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: '1MB',
      })
    ) // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json({ limit: '1MB' })) // parse application/json

    this.app.use('/api-docs', swagger.serve, swagger.setup)

    /**
     * Setting routes
     */

    useExpressServer(this.app, {
      classTransformer: true,
      development: false,
      controllers: [ActivitiesController, EventsController, PlacesController],
      defaultErrorHandler: false,
    })

    return this.app
  }
}
