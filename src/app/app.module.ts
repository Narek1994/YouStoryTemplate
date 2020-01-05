import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CreatestoryComponent } from './createstory/createstory.component';
import {FormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InitialComponent } from './initial/initial.component';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    LoginComponent,
    CreatestoryComponent,
    InitialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [InitialComponent]
})
export class AppModule { }
