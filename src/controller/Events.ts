import { Get, JsonController, QueryParam } from 'routing-controllers'
import { EventService } from '../services/Events'

@JsonController('/events')
export class EventsController {
  private EventService
  constructor() {
    this.EventService = new EventService()
  }
  /**
   * @swagger
   * /events:
   *  get:
   *    tags:
   *      - Events
   *    security:
   *      - jwt: []
   *    summary: Fetches all the events from myhelsinki website and displays.
   *    description: Fetches all the events from myhelsinki website and displays.
   *    parameters:
   *      - in: query
   *        name: limit
   *        description: limit
   *        schema:
   *          type: number
   *          example: 3
   *      - in: query
   *        name: start
   *        description: start
   *        schema:
   *          type: number
   *          example: 3
   *    responses:
   *      200:
   *        $ref: '#/components/responses/Events'
   */

  @Get()
  public async getAllPlaces(@QueryParam('limit') limit: number, @QueryParam('start') start: number) {
    try {
      return await this.EventService.fetchAllEvents(limit, start)
    } catch (e) {
      throw e
    }
  }
}
