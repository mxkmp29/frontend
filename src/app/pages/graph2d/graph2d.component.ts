import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';
import {select} from 'd3';
import {Subscription} from 'rxjs';
import {GraphService} from '../../shared/services/graph.service';
import {ServerFile} from '../configuration/configuration.component';


const TEST_DATA: any = {
    'attributes': [{'x': 6, 'y': 11, 'name': 'MOCK_DATA'}, {'x': 11, 'y': 6, 'name': 'B'}, {
        'x': 6,
        'y': 1,
        'name': 'C'
    }, {'x': 1, 'y': 6, 'name': 'D'}, {'x': 10, 'y': 10, 'name': 'E'}, {'x': 2, 'y': 10, 'name': 'F'}, {
        'x': 10,
        'y': 2,
        'name': 'G'
    }, {'x': 2, 'y': 2, 'name': 'H'}], 'fitness': 0.0, 'survivalProb': 0.0
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
    generation: number;
}

@Component({
    selector: 'app-graph2d',
    templateUrl: './graph2d.component.html',
    styleUrls: ['./graph2d.component.css']
})
export class Graph2dComponent implements OnInit, AfterViewInit, OnDestroy {

    private svg;
    private currentFile: Point[];
    private subscriptions: Subscription[] = [];

    constructor(private socketService: SocketService,
                private graphService: GraphService) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.currentFile = TEST_DATA.attributes;
        this.convertToGraph(this.currentFile);

        this.subscriptions.push(this.socketService.getData().subscribe((data) => {
            console.log('Data', data);
            this.currentFile = JSON.parse(data).attributes;
            this.resetSvg();
            const points = this.convertToGraph(this.currentFile);
            this.linkGraph(points);
        }));

        this.subscriptions.push(this.graphService.getResetFlag().subscribe((data) => {
            if (data) {
                this.resetSvg();
            }
        }));

        this.subscriptions.push(this.graphService.getFile().subscribe((file: ServerFile) => {
            this.currentFile = file.point;

            this.resetSvg();
            this.convertToGraph(this.currentFile);
        }));


    }

    private convertToGraph(points: Point[]): Point[] {
        const nodes: Point[] = [];
        for (const point of points) {
            point.x = (point.x) * 50; // TODO:
            point.y = (point.y) * 50; // TODO:
            nodes.push(point);
        }

        this.svg = select('#graph')
            .append('svg')
            .attr('width', '600px').attr('height', '600px')
            .attr('style', 'border:1px solid black');


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
            .attr('r', '7px')
            .attr('fill', 'black');

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

        return nodes;
    }

    private linkGraph(nodes) {
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
    }

    private update() {
        this.svg.selectAll('g > *').remove();
    }

    private resetSvg() {
        if (this.currentFile) {
            this.svg.remove();
        }
    }
}
