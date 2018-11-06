import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private socket = io('localhost:8888');

    constructor() {

    }

    public sendConfig(): void {

    }

    public getConfig(): void {

    }

    public getStart(): Observable<any> {
        this.socket.emit('Start', 'T');
        return new Observable(observer => {
            this.socket.on('Start', (data) => {
                console.log('SocketIO:Start', data);
                observer.next(data);
            });
        });
    }

}
