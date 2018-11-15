import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';
import {Subscription} from 'rxjs';
import {Chromosome} from '../graph2d/graph2d.component';

@Component({
    selector: 'app-generationinfo',
    templateUrl: './generationinfo.component.html',
    styleUrls: ['./generationinfo.component.css']
})
export class GenerationinfoComponent implements OnInit, OnDestroy {

    bestGeneration = Infinity;
    actGeneration = 0;
    bestFitness = Infinity;
    actFitness = 0.0;

    private subscriptions: Subscription[] = [];

    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.socketService.getData().subscribe(data => {
            const obj: Chromosome = JSON.parse(data);
            this.actGeneration = obj.generation;
            this.actFitness = obj.fitness;

            if (this.actFitness < this.bestFitness) {
                this.bestFitness = this.actFitness;
                this.bestGeneration = this.actGeneration;
            }
        }));
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }


}
