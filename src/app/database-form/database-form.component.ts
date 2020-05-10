import { DataBaseFormStatus } from './../enum/database-form-status';
import { DataBase } from './../entity/database';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.scss']
})
export class DatabaseFormComponent implements OnInit {
  
  @Input() data: DataBase = {} as DataBase;

  @Input() status: DataBaseFormStatus = DataBaseFormStatus.NEW;

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  submitForm(): DataBase {
    if (!this.validateForm.valid) {
      return;
    }
    // save 
    // console.log(this.validateForm.value as DataBase);
  }


  getDatabaseInfo(): DataBase {
    return this.validateForm.value as DataBase
  }
}
