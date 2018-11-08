import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {Configuration} from '../../pages/configuration/configuration.component';
import {MessageService} from './message.service';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private socket = io('localhost:8888');

    constructor(private msgService: MessageService) {

    }

    get isConnected(): boolean {
        return  this.socket.connected;
    }
    public getMessages(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('connect', (data) => {
                console.info('Socket:connect', data);
                observer.next(observer);
            });
            this.socket.on('connect_error', (data) => {
                console.info('Socket:connect_error', data);
                observer.next(observer);

            });
            this.socket.on('disconnect', (data) => {
                console.info('Socket:disconnect', data);
                observer.next(observer);

            });
            this.socket.on('reconnect', (data) => {
                console.info('Socket:reconnect', data);
                observer.next(observer);

            });
            this.socket.on('error', (data) => {
                console.error('Socket:error', data);
                observer.next(observer);
            });
        });
    }

    public getData(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('Data', (data) => {
                console.log('SocketIO:Data', data);
                observer.next(data);
            });
        });
    }

    public getStop(): Observable<any>{
        return new Observable(observer => {
           this.socket.on('Stop', (data) => {
               console.log('SocketIO:Stop');
              observer.next(data);
           });
        });
    }

    public getConfig(): Observable<any>{
        return new Observable(observer => {
           this.socket.on('Config', (data) => {
              console.log('SocketIO:Config', data);
              observer.next(data);
           });
        });
    }

    public sendStart(config: Configuration): void {
        if (this.checkConnetion()) {
            console.log('Socket:start', config);
            this.socket.emit('Start', config);
        }
    }

    public pingConfig(): void {
        if (this.checkConnetion()) {
            console.log('Socket:ping', true);
            this.socket.emit('Config', true);
        }
    }

    public sendStop() {
        if (this.checkConnetion()) {
            this.socket.emit('Stop', true);
        }
    }

    private checkConnetion() {
        if(!this.isConnected) {
            this.msgService.sendMessage('No server connection!');
        }
        return this.isConnected;
    }
}
