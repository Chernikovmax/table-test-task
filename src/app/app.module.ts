import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';
import { ModalPostComponent } from './components/modal-post/modal-post.component';

@NgModule({
  declarations: [
    AppComponent,
    TableWrapperComponent,
    FilterPipe,
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
