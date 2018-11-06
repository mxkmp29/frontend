import {Component, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';
import {select} from 'd3';


const TEST_DATA: any = {
    'attributes': [{'x': 0, 'y': 5, 'name': 'A'},
        {'x': 4, 'y': 4, 'name': 'E'},
        {'x': 5, 'y': 0, 'name': 'B'},
        {'x': 4, 'y': -4, 'name': 'G'},
        {'x': 0, 'y': -5, 'name': 'C'},
        {'x': -4, 'y': -4, 'name': 'H'},
        {'x': -5, 'y': 0, 'name': 'D'},
        {'x': -4, 'y': 4, 'name': 'F'}
        ],
    'fitness': 0.0, 'survivalProb': 0.0
};

export interface Point {
    x: number;
    y: number;
    name: string;
}

export interface Chromosome {
    fitness: number;
    survialProb: number;
    attributes: Point[];
}

@Component({
    selector: 'app-graph2d',
    templateUrl: './graph2d.component.html',
    styleUrls: ['./graph2d.component.css']
})
export class Graph2dComponent implements OnInit {

    private svg;


    constructor(private socketService: SocketService) {
        this.socketService.getStart().subscribe((data) => {
            //this.convertToGraph(data);
        });
    }

    ngOnInit() {
        this.svg = select('#graph')
            .append('svg')
            .attr('width', 600).attr('height', '80vh')
            .attr('border', '1px solid black');

        this.convertToGraph(TEST_DATA);
    }

    private convertToGraph(chromosome: Chromosome) {
        const nodes = [];

        console.log(chromosome);
        for (const point of chromosome.attributes) {
            point.x = (point.x + 6) * 50;
            point.y = (point.y + 6) * 50;
            nodes.push(point);
        }

        const linkedNodes = [];
        for (let i = 0; i < nodes.length; i++) {
            const point = nodes[i];
            let point2;
            if (i === nodes.length - 1) {
                point2 = nodes[0];
            } else {
                point2 = nodes[i + 1];
            }
            linkedNodes.push({source: point, target: point2});
        }

        const circles = this.svg.selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('cx', (d) => {
                return d.x;
            })
            .attr('cy', (d) => {
                return d.y;
            })
            .attr('r', '0.5em')
            .attr('fill', 'black');

        const lines = this.svg.selectAll('.line')
            .data(linkedNodes)
            .enter()
            .append('line')
            .attr('x1', function (d) {
                return d.source.x;
            })
            .attr('y1', function (d) {
                return d.source.y;
            })
            .attr('x2', function (d) {
                return d.target.x;
            })
            .attr('y2', function (d) {
                return d.target.y;
            })
            .style('stroke', 'rgb(6,120,155)');

        const text = this.svg.selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .attr('x', (d) => {
                return d.x;
            })
            .attr('y', (d) => {
                return d.y + 30;
            })
            .text((d) => {
                return d.name;
            })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '20px')
            .attr('fill', 'red');
    }
}
