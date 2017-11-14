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
export class BookComponent implements OnInit {
  
  book: Book;
  textGridCurrentPage: String = 'Total records: ';
  books: Book[];
  selectedBook: Book;
  stacked: boolean;
  totalRecords: number;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getRecordCount();
  }

  getRecordCount() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.totalRecords = data? data.length: 0;
    });
  }

  onRowSelect(event) {
    console.log(event.data);
    let tempBook = event.data;

  }

  toggle() {
    this.stacked = !this.stacked;
  }

  

}
