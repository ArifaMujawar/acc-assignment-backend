import Axios from 'axios'
import { availableTags } from '../utils/AvailableTags'
export class EventService {
  constructor() {}
  public async fetchAllEvents(limit, start, tag) {
    const result = {
      nextStartIndex: Number(limit) + Number(start),
      availableTags,
      data: [],
    }

    const url = `https://open-api.myhelsinki.fi/v1/events/`
    const eventsData = await Axios.get(url, {
      params: {
        limit,
        start,
        tag,
      },
    })

    const arrayOfEvents = eventsData.data.data
    console.log('arrayOF events', arrayOfEvents)
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
