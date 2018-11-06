import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {Configuration} from '../../pages/configuration/configuration.component';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private socket = io('localhost:8888');

    constructor() {

    }

    //TODO: Error message no connection + start und stop etc

    public getData(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('Data', (data) => {
                console.log('SocketIO:Data', data);
                observer.next(data);
            });
        });
    }

    public sendStart(config: Configuration): void {
        this.socket.emit('Start', config);
    }

    public sendConfig(config: Configuration): void {
        this.socket.emit('Config', config);
    }

    public sendStop() {
        this.socket.emit('Stop');
    }
}
