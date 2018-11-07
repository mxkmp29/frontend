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
    private _isConnected = false;

    constructor(private msgService: MessageService) {

    }

    get isConnected(): boolean {
        return this._isConnected;
    }
    public getMessages(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('connect', (data) => {
                console.info('Socket:connect', data);
                this._isConnected = true;
            });
            this.socket.on('connect_error', (data) => {
                console.info('Socket:connect_error', data);
                this._isConnected = false;
            });
            this.socket.on('disconnect', (data) => {
                console.info('Socket:disconnect', data);
                this._isConnected = false;
            });
            this.socket.on('reconnect', (data) => {
                console.info('Socket:reconnect', data);
                this._isConnected = false;
            });
            this.socket.on('error', (data) => {
                console.error('Socket:error', data);
                this._isConnected = false;
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

    public sendStart(config: Configuration): void {
        if (this._isConnected) {
            console.log('Socket:start', config);
            this.socket.emit('Start', config);
        } else {
            this.msgService.sendMessage('No server connection!');
        }
    }

    public sendConfig(config: Configuration): void {
        if (this._isConnected) {
            this.socket.emit('Config', config);
        } else {
            this.msgService.sendMessage('No server connection!');
        }
    }

    public sendStop() {
        if (this.isConnected) {
            this.socket.emit('Stop');
        } else {
            this.msgService.sendMessage('No server connection!');
        }
    }
}
