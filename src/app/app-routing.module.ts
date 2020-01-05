import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatestoryComponent } from './createstory/createstory.component';
import { InitialComponent } from './initial/initial.component';


const routes: Routes = [
  {path: '', component: InitialComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreatestoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
