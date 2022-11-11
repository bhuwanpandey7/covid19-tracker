import { Injectable } from '@angular/core';

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
}
