import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { NzListModule } from 'ng-zorro-antd/list';

import { IconDefinition } from '@ant-design/icons-angular';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { AppComponent } from './app.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { ApiFill, ApiTwoTone, CodeTwoTone} from '@ant-design/icons-angular/icons';

import { AppHeaderComponent } from './app-header/app-header.component';
import { DatabaseFormComponent } from './database-form/database-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzInputModule } from 'ng-zorro-antd/input';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { NzMessageModule } from 'ng-zorro-antd/message';

const icons: IconDefinition[] = [ ApiFill, ApiTwoTone,CodeTwoTone ];
@NgModule({
  declarations: [AppComponent, AppHeaderComponent, DatabaseFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzListModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzMessageModule,
    NzIconModule.forRoot(icons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
