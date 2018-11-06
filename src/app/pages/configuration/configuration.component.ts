import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../shared/services/socket.service';

export interface Configuration {
  stepInterval: number;
  populationSize: number;
  crossProbability: number;
  mutationProbability: number;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit, AfterViewInit {
  stepInterval = 0;
  populationSize = 100;
  crossProb = 0.3;
  mutProb = 0.05;
  @ViewChild('stepInterval') stepIntervalSlider;
  @ViewChild('popSize') popSizeSlider;
  @ViewChild('crossProb') crossProbSlider;
  @ViewChild('mutProb') mutationProbSlider;

  constructor(private socketService: SocketService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
      this.socketService.sendConfig(this.getConfig());
  }

  start() {

      this.socketService.sendStart(this.getConfig());
  }

  stop() {
      this.socketService.sendStop();
  }

  reset() {
      this.stepIntervalSlider.value = this.stepInterval;
      this.popSizeSlider.value = this.populationSize;
      this.crossProbSlider.value = this.crossProb;
      this.mutationProbSlider.value = this.mutProb;
  }

  getConfig(): Configuration {
      return {
          stepInterval: this.stepIntervalSlider.value,
          populationSize: this.popSizeSlider.value,
          crossProbability: this.crossProbSlider.value,
          mutationProbability: this.mutationProbSlider.value
      };
  }

}
