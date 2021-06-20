const axios = require('axios')
const mockData = require('./mockPlacesData')

const places = require('../services/Places')

describe('Fetch Places - unit tests', () => {
  test('Fetch places with start Index 0 and page size 3', async () => {
    jest.mock('axios', () => {
      return {
        __esModule: true,
        default: jest.fn(),
        get: jest.fn().mockReturnValue({
          data: mockData.mockPlaceInputStartIndex0,
        }),
      }
    })
    const placesObject = new places.PlaceService()

    const result = await placesObject.fetchAllPlaces('fi', 3, 0)

    expect(result).toMatchObject(mockData.expectedPlaceOutputStartIndex0)
  })

  test('Fetch places with start Index 3 and page size 3', async () => {
    jest.mock('axios', () => {
      return {
        __esModule: true,
        default: jest.fn(),
        get: jest.fn().mockReturnValue({
          data: mockData.mockPlaceInputStartIndex3,
        }),
      }
    })

    const placesObject = new places.PlaceService()
    const result = await placesObject.fetchAllPlaces('fi', 3, 3)

    expect(result).toMatchObject(mockData.expectedPlaceOutputStartIndex3)
  })
})
