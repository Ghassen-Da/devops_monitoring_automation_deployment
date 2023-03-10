import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { PrometheusConfig } from './config/prometheus.config';
import { Car } from './models/Car.entity';
import { House } from './models/House.entity';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    private readonly prometheusConfig: PrometheusConfig,
  ) {}

  getHello(): string {
    return 'Welcome to the e-commerce API!';
  }

  getCarById(id: number): Observable<AxiosResponse<Car>> {
    this.prometheusConfig.counterCarRequests.add(1, { pid: process.pid });
    return this.httpService
      .get('http://service-car:3001/car/' + id)
      .pipe(map((response) => response.data));
  }

  getHouseById(id: number): Observable<AxiosResponse<House>> {
    this.prometheusConfig.counterHouseRequests.add(1, { pid: process.pid });
    return this.httpService
      .get('http://service-house:3002/house/' + id)
      .pipe(map((response) => response.data));
  }
}
