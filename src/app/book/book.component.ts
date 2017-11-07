import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { Router } from '@angular/router';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: []
})
export class BookComponent implements OnInit{

  books: Book[];

  constructor(private bookService: BookService) { 
    console.log("in BookComponent");
  } 

   ngOnInit() {
    console.log("in ngOnInit() of BookComponent"); 
    this.bookService.getBooks().subscribe(books => this.books = books );
  }

}
