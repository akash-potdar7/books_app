import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
 
import { BookComponent } from '../book/book.component';
 
const routes: Routes = [
  { path: 'allBooks', component: BookComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {

  constructor(){
    console.log("in AppRoutingModule");
    console.log("routes= " + routes[0].path);
  }

}