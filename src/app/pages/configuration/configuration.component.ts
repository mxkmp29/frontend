import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';
import {MessageService} from '../../shared/services/message.service';
import {Subscription} from 'rxjs';
import {GraphService} from '../../shared/services/graph.service';

export interface Configuration {
  stepInterval: number;
  populationSize: number;
  crossProbability: number;
  mutationProbability: number;
  populationToSimulate: number;
  selectFromMatingPool: boolean;
  cancelCriteria?: CancelCriteria;
  combinationProcess?: CombinationProcess;
  selectoinProcess?: SelectionProcess;

}

export interface CancelCriteria {
    test: boolean;
}

export interface CombinationProcess {
    test: boolean;
}


export interface SelectionProcess {
    test: boolean;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit, AfterViewInit, OnDestroy {
  stepInterval = 0;
  populationSize = 1000;
  crossProb  = 0.30;
  mutProb = 0.05;
  populationToSim = 100;
  selectFromMatingPool = false;

  private subscriptions: Subscription[] = [];

  constructor(private socketService: SocketService,
              private graphService: GraphService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
      this.subscriptions.push(this.socketService.getMessages().subscribe((data) => {
      }));
  }

  ngOnDestroy() {
      for (const sub of this.subscriptions) {
          sub.unsubscribe();
      }
  }

  start() {
      this.socketService.sendStart(this.getConfig());
  }

  stop() {
      this.socketService.sendStop();
  }

  reset() {
      this.graphService.setResetFlag(true);
      this.stepInterval = 0;
      this.populationSize = 1000;
      this.crossProb = 0.3;
      this.mutProb = 0.05;
      this.selectFromMatingPool = false;
  }

  getConfig(): Configuration {
      return {
          stepInterval: this.stepInterval,
          populationSize: this.populationSize,
          crossProbability: this.crossProb,
          mutationProbability: this.mutProb,
          selectFromMatingPool: this.selectFromMatingPool,
          populationToSimulate: this.populationToSim
      };
  }

}
