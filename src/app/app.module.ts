import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookService } from './book/book.service';

//import { AppRoutingModule } from './app-routing/app-routing.module';
import { 
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule, 
        MatListModule, 
        MatTableModule, 
        MatButtonModule, 
        MatCardModule, 
        MatSelectModule, 
        MatSnackBarModule } from '@angular/material';

import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataGridModule, Header, Footer, DataTableModule, SharedModule } from 'primeng/primeng';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { NgbdModalComponent } from './book/NgbdModalComponent';
import { DataService } from './common/data.service';

const routes: Routes = [
  { path: 'books', component: BookComponent },
  { path: 'addNewBooks', component: AddNewBookComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    DataGridModule,
    DataTableModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    BookComponent,
    AddNewBookComponent,
    NgbdModalComponent
  ],
  entryComponents: [ NgbdModalComponent ],
  providers: [ BookService, DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

  constructor() {
    console.log("in AppModule");
  }

}
