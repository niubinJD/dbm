import { Injectable } from '@angular/core';
import * as nedb from 'nedb';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private stores: Map<string, Nedb> = new Map();
  constructor() {
    const metadata = new nedb({
      filename: path.join(__dirname, 'data/metadata.db'),
      autoload: true,
      timestampData: true
    });
    this.stores.set('metadata', metadata);
   };

   getDataStore(table: string) {
     return this.stores.get(table);
   }
}