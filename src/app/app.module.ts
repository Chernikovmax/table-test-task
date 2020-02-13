import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ModalPostComponent } from './components/modal-post/modal-post.component';

@NgModule({
  declarations: [
    AppComponent,
    TableWrapperComponent,
    ModalPostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
