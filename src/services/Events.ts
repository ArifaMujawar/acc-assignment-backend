const axios = require('axios')

import { availableTags } from '../utils/AvailableTags'
export class EventService {
  constructor() {}
  public async fetchAllEvents(limit, start, tag) {
    const result = {
      nextStartIndex: Number(limit) + Number(start),
      availableTags,
      data: [],
    }

    const url = `${process.env.BASE_URL}/events/`
    const eventsData = await axios.get(url, {
      params: {
        limit,
        start,
        tags_filter: tag,
      },
    })

    const arrayOfEvents = eventsData.data.data

    arrayOfEvents.forEach(event => {
      const startDate = event.event_dates.starting_day && event.event_dates.starting_day.split('T')
      const endDate = event.event_dates.ending_day && event.event_dates.ending_day.split('T')

      const specificEvent = {
        name: event.name['fi'],
        info: event['info_url'],
        description: event.description,
        event_dates: !endDate || startDate[0] == endDate[0] ? startDate[0] : startDate[0] + '-' + endDate[0],
      }
      result.data.push(specificEvent)
    })

    return result
  }
}
