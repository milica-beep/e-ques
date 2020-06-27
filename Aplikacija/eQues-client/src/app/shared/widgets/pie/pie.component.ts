import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  @Input() data: number[];

  Highcharts = Highcharts;

  chart: Chart;

  ngOnInit(): void {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Ocene'
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
            text: 'Ocena'
        },
        accessibility: {
          rangeDescription: 'Range: 1 to 5'
      }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [
        {
          type: 'line',
          name: 'Ocena',
          data: this.data
        }
      ],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
   }]
   }
    });
    console.log('u pie');
    console.log(this.data);

  }

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

}
