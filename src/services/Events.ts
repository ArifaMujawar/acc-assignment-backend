import Axios from 'axios'

export class EventService {
  constructor() {}
  public async fetchAllEvents(limit, start) {
    const result = {
      nextStartIndex: Number(limit) + Number(start),
      data: [],
    }

    const url = `https://open-api.myhelsinki.fi/v1/events/`
    const eventsData = await Axios.get(url, {
      params: {
        limit,
        start,
      },
    })

    const arrayOfEvents = eventsData.data.data
    arrayOfEvents.forEach(event => {
      const startDate = event.event_dates.starting_day.split('T')
      const endDate = event.event_dates.ending_day.split('T')

      const specificEvent = {
        name: event.name['fi'],
        info: event['info_url'],
        description: event.description,
        event_dates: startDate[0] == endDate[0] ? startDate[0] : startDate[0] + '-' + endDate[0],
      }
      result.data.push(specificEvent)
    })

    return result
  }
}
