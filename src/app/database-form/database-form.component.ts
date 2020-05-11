import { DataBaseFormStatus } from './../enum/database-form-status';
import { DataBase } from './../entity/database';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataStoreService } from '../core/services';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.scss']
})
export class DatabaseFormComponent implements OnInit {
  
  @Input() data: DataBase = {} as DataBase;

  @Input() status: DataBaseFormStatus = DataBaseFormStatus.NEW;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,private store: DataStoreService,private modal: NzModalService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      connectionName: [this.data.connectionName, []],
      host: ['localhost', [Validators.required]],
      port: ['3306', [Validators.required]],
      username: ['root', [Validators.required]],
      password: [this.data.password, [Validators.required]],
      remember: [false, [Validators.required]],
    });
  }

  submitForm(okCallBack?: Function): DataBase {
    if (!this.validateForm.valid) {
      return;
    }
    this.store.getDataStore('metadata').insert(this.validateForm.value as DataBase, err => {
      if(!err) {
        // if (okCallBack) okCallBack();
        return !!okCallBack && okCallBack();
      }
      if (err['errorType'] == 'uniqueViolated') {
        this.modal.error({ nzTitle: '提示', nzContent: `连接名${err['key']}已存在!`, nzMask: false, nzGetContainer: () => document.body});
        return;
      }
      debugger
      console.log('insert error', err);
    });
  }


  getDatabaseInfo(): DataBase {
    return this.validateForm.value as DataBase
  }
}
