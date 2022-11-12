import * as Highcharts from 'highcharts';
import HighChartExporting from 'highcharts/modules/exporting';
import HighChartExportData from 'highcharts/modules/export-data';
import Boost from 'highcharts/modules/boost';
import Accessibility from 'highcharts/modules/accessibility';

HighChartExporting(Highcharts);
HighChartExportData(Highcharts);
Boost(Highcharts);
Accessibility(Highcharts);

export class ChartService {

  constructor() { }

  initChart() {
    return Highcharts;
  }
}
