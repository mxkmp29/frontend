import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphServiceService {

  private resetFlag: ReplaySubject<boolean>;
  constructor() { }
}
