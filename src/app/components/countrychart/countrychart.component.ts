import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartHelperService } from 'src/app/service/chart-helper.service';
import { ChartService } from 'src/app/service/chart.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, share, Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/utility/helper.service';

@Component({
  selector: 'app-countrychart',
  templateUrl: './countrychart.component.html',
  styleUrls: ['./countrychart.component.scss']
})
export class CountrychartComponent implements OnInit, OnChanges {
  @Input() selectedCountry: any;
  isLoading: boolean = false;
  countryCovidData: any;
  $destroyed: Subject<boolean> = new Subject<boolean>();
  covidChart: any;

  constructor(
    private httpClient: HttpClient,
    private chartService: ChartService,
    private helperService: HelperService,
    private chartHelperService: ChartHelperService) {
    this.highChart = this.chartService.initChart();
  }

  highChart: any;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateChart();
  }

  generateChart() {
    const chartOptions = this.chartHelperService.ChartOptions;
    if (this.covidChart) {
      this.covidChart.destroy();
    }
    this.isLoading = true;
    this.httpClient.get(`https://covid-193.p.rapidapi.com/history?country=${this.selectedCountry}`)
      .pipe(
        takeUntil(this.$destroyed),
        share(),
        catchError(this.helperService.handleError('getCountryCovidData')))
      .subscribe((data: any) => {
        this.countryCovidData = data.response;
        chartOptions.series = this.chartHelperService.generateChartSeries(this.countryCovidData);
        this.covidChart = this.highChart.chart('covid-country-chart', chartOptions);
        this.isLoading = false;
        console.log(data.response);
      })
  }

  ngOnDestroy() {
    this.$destroyed.unsubscribe();
  }
}
