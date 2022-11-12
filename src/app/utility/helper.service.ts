import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  debounce = (functionToDebounce: Function) => {
    let timer: any;
    return (...args: any) => {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        functionToDebounce.apply(context, args);
      }, 500);
    };
  };

  handleError<T>(execution = 'API Failed', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${execution} Failed: ${error.message}`);
      return of(result as T);
    };
  }

  public log(message: string) {
    console.log(message);
  }
}
