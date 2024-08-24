import { AxiosStatic } from 'axios';


export interface StromglassForecastResponse{
  hours: StormglassPoint[];
}

export interface StormglassPoint{
  readonly time: string;
  readonly swellDirection: StormglassPointSource;
  readonly swellHeight: StormglassPointSource;
  readonly swellPeriod: StormglassPointSource;
  readonly waveDirection: StormglassPointSource;
  readonly waveHeight: StormglassPointSource;
  readonly windDirection: StormglassPointSource;
  readonly windSpeed: StormglassPointSource;

}

export interface StormglassPointSource{
  [key: string]: number;
}

export interface ForecastPoint{
  time: string;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  waveDirection: number;
  waveHeight: number;
  windDirection: number;
  windSpeed: number;
}

export class StormGlass{
  readonly requestParam: string = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassAPISource: string = 'noaa';
  constructor(protected request: AxiosStatic){}

  public async fetchPoints(lat:number, lng:number): Promise<ForecastPoint[]>{
    const response = await this.request.get<StromglassForecastResponse>(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${this.requestParam}&source=${this.stormGlassAPISource}`,
      {
        headers: {
          Authorization: '9b8b25a4-60e0-11ef-968a-0242ac130004-9b8b2612-60e0-11ef-968a-0242ac130004',
        },
      }
    );

    return this.normalizeResponse(response.data);

  }


  private normalizeResponse(points: StromglassForecastResponse): ForecastPoint[]{
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      time: point.time,
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource]
    }));
  };

  private isValidPoint(point: Partial<StormglassPoint>): boolean{
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassAPISource] &&
      point.swellHeight?.[this.stormGlassAPISource] &&
      point.swellPeriod?.[this.stormGlassAPISource] &&
      point.waveDirection?.[this.stormGlassAPISource] && 
      point.waveHeight?.[this.stormGlassAPISource] &&
      point.windDirection?.[this.stormGlassAPISource] &&
      point.windSpeed?.[this.stormGlassAPISource]
    );
  }

}