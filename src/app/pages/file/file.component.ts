import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {ConfigurationComponent} from '../configuration/configuration.component';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
    public files;

    constructor(private bottomSheetRef: MatBottomSheetRef<ConfigurationComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        this.files = data;
    }

    ngOnInit() {
    }

    public openLink(event: MouseEvent, file) {
        this.bottomSheetRef.dismiss(file);
        event.preventDefault();
    }
}
