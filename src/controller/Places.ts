import { Get, JsonController, QueryParam } from 'routing-controllers'
import { Connection } from 'typeorm'
import { PlaceService } from '../services/Places'
import 'reflect-metadata'

@JsonController('/places')
export class PlacesController {
  private conn: Connection
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
   *    description: write here something
   *    parameters:
   *      - in: query
   *        name: languageFilter
   *        description: languageFilter
   *        schema:
   *          type: string
   *          example: en
   *    responses:
   *      200:
   *        $ref: '#/components/responses/Ticket'
   *      403:
   *        $ref: '#definitions/AdminAccessRequired'
   *      500:
   *        $ref: '#definitions/DatabaseError'
   */

  @Get()
  public async getAllPlaces(@QueryParam('languageFilter') languageFilter: string) {
    try {
      return await this.PlaceService.fetchAllPlaces(languageFilter)
    } catch (e) {
      throw e
    }
  }
}
