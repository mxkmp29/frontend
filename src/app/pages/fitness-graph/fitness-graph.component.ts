import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';


@Component({
    selector: 'app-fitness-graph',
    templateUrl: './fitness-graph.component.html',
    styleUrls: ['./fitness-graph.component.css']
})
export class FitnessGraphComponent implements OnInit {

    chartOptions = {
        responsive: true
    };
    chartData = [
        {x: 1, y: 330}, {x: 2, y: 260}, {x: 3, y: 300}
    ];
    chartLabels = ['January', 'February', 'Mars', 'April'];
    private chart;

    constructor() {

    }

    ngOnInit() {
        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: this.chartLabels,
                datasets: [
                    {
                        data: this.chartData,
                        borderColor: '#3cba9f',
                        fill: false
                    },
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });
    }


    onChartClick(event) {
        console.log(event, this.chart);
    }

}
