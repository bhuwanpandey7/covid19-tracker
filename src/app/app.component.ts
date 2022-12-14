import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, share, Subject, takeUntil } from 'rxjs';
import { TITLES, URLS } from './enums/urls.enum';
import { ChartHelperService } from './service/chart-helper.service';
import { HelperService } from './utility/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Covid Tracker';
  $destroyed: Subject<boolean> = new Subject<boolean>();
  selectedCountry: string = 'USA';
  udpatedCountryList: string[] = [];

  constructor(private httpClient: HttpClient,
    private helperService: HelperService,
    private chartHelperService: ChartHelperService) { }

  countries: Array<string> = [];
  covidSummary: any = [];

  ngOnInit() {
    this.getCovidOverview();
  }

  trackByCountryFn(index: number, item: any) {
    return index;
  }

  updateCountry(country: string, event: any) {
    event.preventDefault();
    this.selectedCountry = country;
  }

  filterCoutryList(event: any) {
    const filterValue = event.target.value && event.target.value.trim().toLowerCase();
    if (filterValue && filterValue.length) {
      const filterCountries = () => {
        this.udpatedCountryList = [...this.countries]
          .filter(elem => elem.trim().toLowerCase().indexOf(filterValue) != -1);
      }
      this.helperService.debounce(filterCountries)();
    }
  }

  getCovidOverview() {
    this.getCovidSpreadSummary();
    this.getAllCountries();
  }

  private getAllCountries() {
    this.httpClient.get(URLS.GET_COUNTRIES)
      .pipe(
        takeUntil(this.$destroyed),
        share(),
        catchError(this.helperService.handleError('getCountries'))
      )
      .subscribe((data: any) => {
        this.countries = [...data.response]
        this.udpatedCountryList = [...this.countries];
      });
  }

  private getCovidSpreadSummary() {
    this.httpClient.get(URLS.GET_STATISTICS)
      .pipe(
        takeUntil(this.$destroyed),
        share(),
        map((data: any) => data.response),
        catchError(this.helperService.handleError('getCountryCovidData'))
      )
      .subscribe((data: any) => {
        let final: any = this.transformCovidSummary(data);
        this.covidSummary.push.apply(
          this.covidSummary,
          [
            {
              title: TITLES.TOTAL,
              value: final.total,
              color: "blue"
            },
            {
              title: TITLES.ACTIVE,
              value: final.active,
              color: "rgb(250, 100, 0)"
            },
            {
              title: TITLES.RECOVERED,
              value: final.recovered,
              color: "rgb(28, 177, 66)"
            },
            {
              title: TITLES.DEATHS,
              value: final.deaths,
              color: "red"
            }
          ]
        );
      });
  }

  private transformCovidSummary(data: any) {
    return this.chartHelperService.gnerateCovidSummaryDetails(data);
  }

  ngOnDestroy() {
    this.$destroyed.unsubscribe();
  }
}
