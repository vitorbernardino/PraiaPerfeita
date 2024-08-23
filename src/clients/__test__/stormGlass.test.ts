import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormglassReqResponse from '@test/fixtures/stormglassReqResponse.json';
import stormglassResponseNormalized from '@test/fixtures/stormglassResponseNormalized.json';

jest.mock('axios');
describe('stormGlass client', () => {
  it('should return forecast from de external API', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    axios.get = jest.fn().mockResolvedValue(stormglassReqResponse);
    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormglassResponseNormalized);
  });

});