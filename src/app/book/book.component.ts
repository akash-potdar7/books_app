import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Book } from './book';
import { Router } from '@angular/router';
import { BookService } from './book.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core/src/metadata/di';
import { NgbdModalComponent } from './NgbdModalComponent';
import { DataService } from '../common/data.service';
import { MatSnackBar } from '@angular/material';
import { DataTable } from 'primeng/components/datatable/datatable';

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
  stacked: boolean;
  totalRecords: number;
  private genreData: any;

  constructor(private bookService: BookService, private modalService: NgbModal, public dataService: DataService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    let genres;
    this.loadGeners();
  }

  loadGeners() {
    let genres;
    this.bookService.getGenreDropDownData().subscribe(data => {
      genres = data;
      this.genreData = genres;
      this.getAllBooks();
    });
  }

  getAllBooks() {
    let genres = this.genreData;
    let tempBook: Book;
    //let listTempBooks: Book[];
    let listTempBooks: Array<Book> = [];
    this.bookService.getBooks().subscribe(data => {
      data.forEach(book => {
        genres.forEach(genre => {
          if (book.genreId === genre.id) {
            tempBook = {
              isbn: book.isbn,
              name: book.name,
              genre: genre,
              author: book.author,
              genreId: book.genreId
            };
          }
        });
        listTempBooks.push(tempBook);
      });
      this.books = listTempBooks;
      this.totalRecords = data ? data.length : 0;
    });
  }

  onRowSelect(event) {
    let tempBook: Book = event.data;
    this.dataService.setData(tempBook);
    this.modalService.open(NgbdModalComponent).result.
      then((result) => {
        if (result === 'updateBookSuccess') {
          this.snackBar.open(tempBook.name + ' updated successfully', 'Done', { duration: 4000 });
        } else if (result === 'deleteBookSuccess') {
          this.snackBar.open(tempBook.name + ' deleted successfully', 'Done', { duration: 4000 });
        }
        }, (reason) => {
          console.log(reason);
          this.snackBar.open(tempBook.name + ' Error..!', 'Done', { duration: 4000 });
        }
      );
  }

  // not working
  onValueChange(value: any) {
    console.log('YEss..!');
    console.log('New Value= ' + value);
  }

  update(dt: DataTable) {
    dt.reset();
  }

  toggle() {
    this.stacked = !this.stacked;
  }

}