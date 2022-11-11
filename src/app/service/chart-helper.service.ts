import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartHelperService {
  generateChartSeries(countryCovidData: any) {
    return [{
      type: 'bar',
      allowPointSelect: false,
      visible: true,
      showLegend: true,
      cursor: 'pointer',
      color: 'rgb(250, 100, 0)',
      marker: {
        symbol: 'diamond'
      },
      name: 'Covid Data',
      id: `Covid_${Math.random() * 1.24515}`,
      data: this.getData(countryCovidData)
    }]
  }

  getData(countryCovidData: any) {
    const data = countryCovidData;
    const active = data.reduce((acc: any, curr: any) => acc + curr.cases.active, 0);
    const total = data.reduce((acc: any, curr: any) => acc + curr.cases.total, 0);
    const recovered = data.reduce((acc: any, curr: any) => acc + curr.cases.recovered, 0);
    const deaths = data.reduce((acc: any, curr: any) => acc + curr.deaths.total, 0);
    return [active, total, recovered, deaths];
  }

  CHART_OPTIONS: any;

  constructor() {
    this.CHART_OPTIONS = {
      title: {
        text: 'Country Covid Trends'
      },
      yAxis: {
        title: {
          text: 'Covid Case Count'
        },
        gridLineWidth: 1
      },
      xAxis: {
        title: 'Covid Trends',
        gridLineWidth: 1,
        type: 'types',
        categories: ['Active', 'Total', 'Recovered', 'Deaths']
      },
      chart: {
        animation: true
      },
      boost: {
        seriesThreshold: 10000,
        useGPUTranslations: true
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: true
          },
          pointStart: 0,
        }
      }
    }
  }

  get ChartOptions() {
    return this.CHART_OPTIONS;
  }
}
