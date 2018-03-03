import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MockStocksResponse } from './stocks.mock';
import { StocksService } from './stocks.service';

export class StubStocksService extends StocksService {

  constructor() {
    super({} as HttpClient);
  }

  load(symbols: string[]) {
    return Observable.create(MockStocksResponse);
  }

}
