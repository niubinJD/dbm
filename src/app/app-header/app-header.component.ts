import { ConnectManagerService } from './../core/services/connection-manager/connect-manager.service';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DatabaseFormComponent } from '../database-form/database-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Connection } from 'mysql';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {

  @ViewChild('form') form: DatabaseFormComponent;

  load: boolean = false;

  isVisible: boolean = false;

  @Output() update = new EventEmitter<any>();

  private testFn: Promise<any>;


  constructor(private modal: NzModalService, private manager: ConnectManagerService, private message: NzMessageService) {
   }

  ngOnInit(): void {
  }

  openModal(): void {
    this.isVisible = true;
  }

  confirmEvent() {
    this.form.submitForm(() => {
      this.isVisible = false;
      this.update.emit();
    });
  }

  execTest() {
    this.load = true;
    const info  = this.form.getDatabaseInfo();
    this.manager.getConnection(info)
    .then((conn: Connection) => {
      // conn.destroy();
      console.log('success');
      this.modal.success({ nzTitle: '提示', nzContent: "连接成功", nzMask: false, nzGetContainer: () => document.body});
    }).catch(error => {
      console.log(error);
      this.modal.error({ nzTitle: '提示', nzContent: error.code, nzMask: false, nzGetContainer: () => document.body});
    }).finally(() => this.load = false);
 }
}
