import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QueryFormComponent } from './query-form/query-form.component';
import { QueryResultComponent } from './query-result/query-result.component';
import { QueryWrapperComponent } from './query-wrapper/query-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryFormComponent,
    QueryResultComponent,
    QueryWrapperComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
