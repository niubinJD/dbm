import { ConnectManagerService } from './../core/services/connection-manager/connect-manager.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { DatabaseFormComponent } from '../database-form/database-form.component';
import { DataBase } from '../entity/database';
import { DataBaseFormStatus } from '../enum/database-form-status';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  
  @ViewChild('modalFooter') footer: TemplateRef<any>;

  modalInstance:NzModalRef;

  load = false;

  constructor(private modal: NzModalService, private manager: ConnectManagerService, private message: NzMessageService) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.load = false;
    this.modalInstance = this.modal.create({
      nzTitle: '新建连接',
      nzContent: DatabaseFormComponent,
      nzGetContainer: () => document.body,
      nzClosable: true,
      nzMask: false,
      nzComponentParams: {
        data: {} as DataBase,
        status: DataBaseFormStatus.NEW
      },
      nzFooter: this.footer,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }


  /**
   * 保存数据库信息
   * @param instance
   */
  confirmEvent(instance: NzModalRef) {
    const component: DatabaseFormComponent = instance.getContentComponent();
    component.submitForm();
    instance.destroy();
  }

  /**
   * 测试数据库连接
   * @param instance 
   */
  execTest(instance: NzModalRef) {
    let self = this;
    if (this.load) {
      return;
    }
    this.load = true;
    const component: DatabaseFormComponent = instance.getContentComponent();
    const info  = component.getDatabaseInfo();
    const conn = this.manager.getConnection(info);
    conn.connect(err => {
      if (err) {
        // TODO  连接测试的消息提示
        setTimeout(() => this.load = false, 1000);
        console.log(err.message, self.load);
        // this.modalInstance.componentInstance()
        // this.message.error(err.message)
        // debugger
        // this.modal.error({ nzTitle: '提示', nzContent: err.code, nzMask: false})
        // debugger
        return;
      }
      self.load = false;
      console.log("连接成功");

      // this.modal.error({ nzTitle: '提示', nzContent: "连接成功", nzMask: false})
    })
  }

}
