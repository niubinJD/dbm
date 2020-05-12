import { DataBaseStatus } from './../entity/database-status';
import { DataBase } from './../entity/database';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions, NzFormatEmitEvent, NzTreeComponent } from 'ng-zorro-antd/tree';
import { ElementType } from './../enum/element-type';
import { ConnectManagerService } from '../core/services';
import { Connection } from 'mysql';

@Component({
  selector: 'database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.scss'],
})
export class DatabaseListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: Array<DataBase> = [];
  status: Array<DataBaseStatus> = [];
  trees: Array<NzTreeNodeOptions> = [];
  @ViewChild('tree')
  instance: NzTreeComponent;
  fnMap = {
    1: this.ConnectionProcesss
  };
  constructor(private manager: ConnectManagerService) { }

  ngOnInit(): void {
    console.log('database-list init', ElementType.CONNECTION);
    let arr = [];
    // this.status = this.data as Array<DataBaseStatus>;
    this.data.forEach(d => arr.push({title: d.connectionName,key: d._id, isLeaf: true, data: d, open: false, type: ElementType.CONNECTION} as NzTreeNodeOptions));
    this.trees = arr;
    console.log(this.trees);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if(changes['data'].isFirstChange()) {
      return;
    }
    this.merge();
  }
  ngAfterViewInit(): void {
    console.log(this.instance);
  }
  // expandChange(event: Required<NzFormatEmitEvent>): void {
  //   if (event.eventName === 'expand') {
  //     const node = event.node;
  //     // node['data'].status = true;
  //     if (node.getChildren().length === 0 && node.isExpanded) {
      
  //       // load data...
  //       node.addChildren([{title: 'd.connectionName',key: new Date().getTime() + '', data: {} as DataBaseStatus, type: ElementType.DATABASE}]);
  //     }
  //   }
  // }
  expandChange(event: Required<NzFormatEmitEvent>): void {
    console.log(event.eventName);
    console.log(event);
    if (event.eventName === 'expand') {
      const node = event.node;
      if (node.isLeaf) {
        // 叶子节点
        return;
      }
      // 非叶子节点，如果没有数据，将其变为叶子节点
      if (!node.origin.open || node.children.length == 0) {
        node.isLeaf = true;
        return;
      }
    }
  }
  open(event: Required<NzFormatEmitEvent>) {
    console.log(event.eventName);

    if(event.eventName == 'dblclick') {
      const node = event.node;
      this.fnMap[node.origin.type](node, this);
    }
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }
  private merge(): void{
    let arr = [...this.trees];
    this.data.forEach(d => {
      let var1 = this.trees.find(t => d._id == t.key);
      if (!var1) {
        arr.push({title: d.connectionName,key: d._id,isLeaf: true, data: d as DataBaseStatus, type: ElementType.CONNECTION} as NzTreeNodeOptions)
        return;
      }
      var1.title = d.connectionName;
      var1['data'] = d as DataBaseStatus;
    });

    // 筛出data中不存在的数据库信息，从status删除
    this.trees = arr.filter(a => this.data.find(d => d._id == a.key));
  }


  private ConnectionProcesss(node: NzTreeNode, that: any): void {
    // let self  = this;
    if (node.origin.open) {
      node.isExpanded = !node.isExpanded; // 展开状态转换
      return;
    }
    console.log(that);
      // load data
    that.manager.getConnection(node.origin.data)
    .then((conn: Connection) => {
      conn.createQuery('show databases', (error, results, fields) => {
        console.log(error, results, fields);
        node.origin.open = true; // 连接已打开
      })
    }).catch(err => {
      console.log('query databases', err);
    });
  }
}
