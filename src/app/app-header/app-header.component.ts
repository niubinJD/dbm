import { ConnectManagerService } from './../core/services/connection-manager/connect-manager.service';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { DatabaseFormComponent } from '../database-form/database-form.component';
import { DataBase } from '../entity/database';
import { DataBaseFormStatus } from '../enum/database-form-status';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {

  @ViewChild('form') form: DatabaseFormComponent;

  load: boolean = false;

  isVisible: boolean = false;

  @Output() update = new EventEmitter<any>();


  constructor(private modal: NzModalService, private manager: ConnectManagerService, private message: NzMessageService,private changeRef:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.isVisible = true;
  }

  confirmEvent() {
    this.form.submitForm();
    this.isVisible = false;
    this.update.emit();
  }

  execTest() {
    this.load = true;
    const info  = this.form.getDatabaseInfo();
    const conn = this.manager.getConnection(info);
    let p = new Promise((reslove,reject) => {
      conn.connect((error) => {
        if(error) {
          reject(error);
          return;
        }
        reslove(null);
      });
    });

    p.then(() => {
      console.log('success');
      this.modal.success({ nzTitle: '提示', nzContent: "连接成功", nzMask: false, nzGetContainer: () => document.body});
    }).catch(error => {
      console.log(error);
      // debugger
      this.modal.error({ nzTitle: '提示', nzContent: error.code, nzMask: false, nzGetContainer: () => document.body});
    }).finally(() => {
      this.load = false;
      this.changeRef.detectChanges();
    })
 }
}
