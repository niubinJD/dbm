import { Injectable } from '@angular/core';
import * as nedb from 'nedb';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private stores: Map<string, Nedb> = new Map();
  constructor() {
    this.stores.set('metadata', this.createMetaData());
   };

   getDataStore(table: string) {
     return this.stores.get(table);
   }

   createMetaData(): nedb{
    const metadata = new nedb({
      filename: path.join(__dirname, 'data/metadata.db'),
      autoload: true,
      timestampData: true
    });
    metadata.ensureIndex({ fieldName: 'connectionName', unique: true }, function (err) {
      console.log('metadata index', err);
    });
    return metadata;
   }
}