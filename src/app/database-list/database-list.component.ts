import { DataBaseStatus } from './../entity/database-status';
import { DataBase } from './../entity/database';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.scss']
})
export class DatabaseListComponent implements OnInit, OnChanges {
  @Input() data: Array<DataBase> = [];
  status: Array<DataBaseStatus> = [];
  constructor() { }

  ngOnInit(): void {
    console.log('database-list init');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if(changes['data'].isFirstChange()) {
      this.status = this.data as Array<DataBaseStatus>;
      return;
    }
    this.merge();
  }

  private merge(): void{
    this.data.forEach(d => {
      let var1 = this.status.find(s => d['_id'] == s['_id']);
      if (!var1) {
        this.status.push(d as DataBaseStatus);
        return;
      }
      Object.keys(d).forEach(key => var1[key] = d[key]);
    });

    // 筛出data中不存在的数据库信息，从status删除
    this.status = this.status.filter(s => this.data.find(d => d['_id'] == s['_id']));
  }
}
