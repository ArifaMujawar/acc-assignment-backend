import { Get, JsonController, QueryParam } from 'routing-controllers'
import { PlaceService } from '../services/Places'
import 'reflect-metadata'

@JsonController('/places')
export class PlacesController {
  private PlaceService
  constructor() {
    this.PlaceService = new PlaceService()
  }
  /**
   * @swagger
   * /places:
   *  get:
   *    tags:
   *      - Places
   *    security:
   *      - jwt: []
   *    summary: Fetches all the places from myhelsinki website and displays.
   *    description: Fetches all the places from myhelsinki website and displays.
   *    parameters:
   *      - in: query
   *        name: languageFilter
   *        description: languageFilter
   *        schema:
   *          type: string
   *          example: en
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
   *          example: 0
   *    responses:
   *      200:
   *        $ref: '#/components/responses/Places'
   */

  @Get()
  public async getAllPlaces(
    @QueryParam('languageFilter') languageFilter: string,
    @QueryParam('limit') limit: number,
    @QueryParam('start') start: number
  ) {
    try {
      return await this.PlaceService.fetchAllPlaces(languageFilter, limit, start)
    } catch (e) {
      throw e
    }
  }
}
