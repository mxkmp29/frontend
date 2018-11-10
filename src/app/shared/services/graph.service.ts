import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Chromosome} from '../../pages/graph2d/graph2d.component';
import {ServerFile} from '../../pages/configuration/configuration.component';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private resetFlag: ReplaySubject<boolean> = new ReplaySubject(1);
  private resetFlagSource = this.resetFlag.asObservable();

  private bestChromosome: ReplaySubject<Chromosome> = new ReplaySubject(1);
  private chromsomeSource = this.bestChromosome.asObservable();

    private serverFile: ReplaySubject<ServerFile> = new ReplaySubject(1);
    private serverFileSource = this.serverFile.asObservable();

  constructor() { }

  public getResetFlag(): Observable<boolean> {
    return this.resetFlagSource;
}
  public setResetFlag(bool: boolean) {
    this.resetFlag.next(bool);
  }

  public getBestChromosome(): Observable<Chromosome> {
    return this.chromsomeSource;
  }

  public setBestChromosome(chromosome: Chromosome) {
    this.bestChromosome.next(chromosome);
  }

    public getFile(): Observable<ServerFile> {
        return this.serverFileSource;
    }

    public setFile(file: ServerFile): void {
        this.serverFile.next(file);
    }


}
