import Axios from 'axios'
const moment = require('moment')
const momentTz = require('moment-timezone')

export class PlaceService {
  constructor() {}

  public async fetchAllPlaces(language_filter, limit, start) {
    const requiredData = []
    const url = `https://open-api.myhelsinki.fi/v1/places/`
    const placesData = await Axios.get(url, {
      params: {
        language_filter,
        limit,
        start,
      },
    })

    const arrayOfPlaces = placesData.data.data
    arrayOfPlaces.forEach(place => {
      const addressString = Object.values(place.location.address).join(',')
      const temp = 'place.name'
      const placeName = eval(temp.concat(`.${language_filter}`))

      const isOpen = this.checkIfPlaceIsOpen(place)

      const specificPlace = {
        name: placeName,
        address: addressString,
        info: isOpen,
        description: place.description,
      }

      requiredData.push(specificPlace)
    })
    return requiredData
  }

  public checkIfPlaceIsOpen(place) {
    const currentTime = momentTz().tz('Europe/Helsinki').format('HH:mm:ss')
    const curDay = moment().weekday() - 1
    const checkIfValues =
      !!place.opening_hours.hours &&
      !!place.opening_hours.hours[curDay].opens &&
      !!place.opening_hours.hours[curDay].closes

    if (checkIfValues) {
      const currentTimeMoment = moment(currentTime, 'HH:mm:ss')
      const storeOpenTime = moment(place.opening_hours.hours[curDay].opens, 'HH:mm:ss')
      const storeCloseTime = moment(place.opening_hours.hours[curDay].closes, 'HH:mm:ss')

      const isStoreOpen = currentTimeMoment.isBetween(storeOpenTime, storeCloseTime)
      return isStoreOpen
    }
  }
}
