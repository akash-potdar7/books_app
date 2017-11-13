import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { Router } from '@angular/router';
import { BookService } from './book.service';

import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/theme-fresh.css";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: []
})
export class BookComponent implements OnInit {

  textGridCurrentPage: String = 'Total records: ';
  books: Book[];
  selectedBook: Book;
  stacked: boolean;
  totalRecords: number;

  constructor(private bookService: BookService) {
    console.log("in BookComponent");
  }

  ngOnInit() {
    console.log("in ngOnInit() of BookComponent");
    this.getRecordCount();
  }

  getRecordCount() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
      this.totalRecords = data? data.length: 0;
      console.log(this.totalRecords);
    });
  }

  onRowSelect(event) {
    console.log(event.data)
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  

}
