import { AxiosStatic } from 'axios';

export class StormGlass{
  readonly requestParam: string = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  constructor(protected request: AxiosStatic){}

  public async fetchPoints(lat:number, lng:number): Promise<{}>{
    return this.request.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${this.requestParam}`,
      {
        headers: {
          Authorization: '9b8b25a4-60e0-11ef-968a-0242ac130004-9b8b2612-60e0-11ef-968a-0242ac130004',
        },
      }
    );


  }
}