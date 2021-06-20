const axios = require('axios')
const mockData = require('./mockData')
const tags = require('../utils/AvailableTags')

const events = require('../services/Events')

describe('Fetch Events - unit tests', () => {
  test('Fetch general events with start Index 0 and page size 3', async () => {
    jest.mock('axios', () => {
      return {
        __esModule: true,
        default: jest.fn(),
        get: jest.fn().mockReturnValue({
          data: mockData.mockEventInputGeneralStartIndex0,
        }),
      }
    })
    const eventsObject = new events.EventService()

    const result = await eventsObject.fetchAllEvents(3, 0, 'General')

    expect(result).toMatchObject(mockData.expectedEventOutputGeneralStartIndex0)
  })

  test('Fetch general events with start Index 3 and page size 3', async () => {
    jest.mock('axios', () => {
      return {
        __esModule: true,
        default: jest.fn(),
        get: jest.fn().mockReturnValue({
          data: mockData.mockEventInputGeneralStartIndex3,
        }),
      }
    })

    const eventsObject = new events.EventService()
    const result = await eventsObject.fetchAllEvents(3, 3, 'General')

    expect(result).toMatchObject(mockData.expectedEventOutputGeneralStartIndex3)
  })

  test('Fetch Espoo events with start Index 0 and page size 1', async () => {
    jest.mock('axios', () => {
      return {
        __esModule: true,
        default: jest.fn(),
        get: jest.fn().mockReturnValue({
          data: mockData.mockEventInputEspooStartIndex0,
        }),
      }
    })
    const eventsObject = new events.EventService()
    const result = await eventsObject.fetchAllEvents(1, 0, 'Espoo')

    expect(result).toMatchObject(mockData.expectedEventOutputEspooStartIndex0)
  })
})
