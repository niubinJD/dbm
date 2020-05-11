import { Component, OnInit } from '@angular/core';
import { ElectronService, DataStoreService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { DataBase } from './entity/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: Array<DataBase> = [];
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private store: DataStoreService
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
  ngOnInit(): void {
    // this.data = this.store.getDataStore('metadata').find({}) ;
  }

  update(){

  }
}
