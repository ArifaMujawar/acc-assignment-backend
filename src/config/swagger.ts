import * as swaggerUi from 'swagger-ui-express'
import * as swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Accenture Assignment',
    version: '1.0.0',
    description: 'Accenture Assignment',
  },
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./src/controller/**/*.ts', './src/docs/*.yaml'],
}

const swaggerSpec = swaggerJSDoc(options)

export default {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
}
