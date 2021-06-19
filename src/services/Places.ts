import Axios from 'axios'
import * as moment from 'moment'

export class PlaceService {
  constructor() {}

  public async fetchAllPlaces(language_filter, limit) {
    const requiredData = []
    const url = `https://open-api.myhelsinki.fi/v1/places/`
    const placesData = await Axios.get(url, {
      params: {
        language_filter,
        limit,
      },
    })

    const arrayOfPlaces = placesData.data.data
    arrayOfPlaces.forEach(place => {
      const addressString = Object.values(place.location.address).join(',')
      const temp = 'place.name'
      const jagah = eval(temp.concat(`.${language_filter}`))

      const format = 'hh:mm:ss'
      const curTime = moment(moment(), format)
      const curDay = moment().weekday()

      const isOpen =
        place.opening_hours.hours &&
        place.opening_hours.hours[curDay].opens &&
        place.opening_hours.hours[curDay].closes &&
        curTime.isBetween(place.opening_hours.hours[curDay].opens, place.opening_hours.hours[curDay].closes)
          ? true
          : false

      const specificPlace = {
        name: jagah,
        address: addressString,
        info: isOpen,
      }

      requiredData.push(specificPlace)
    })
    return requiredData
  }
}
