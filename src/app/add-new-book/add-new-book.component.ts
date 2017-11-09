import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book';
import { Http, RequestOptions } from '@angular/http';
import { BookService } from '../book/book.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

const isbn_regex = /^\d+$/;

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {
  
  private book: any = {};
  //private book: Book = new Book(456, 'Chasing Tomorrow', 'Thriller', 'Sydney Sheldon');;

  public isbnFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(isbn_regex)]);
  public bookNameFormControl = new FormControl('',[ Validators.required ]);
  public bookGenreFormControl = new FormControl('',[ Validators.required ]);
  public bookAuthorFormControl = new FormControl('',[ Validators.required] );

  genres = [
    { value: 'adventure', viewValue: 'Adventure' },
    { value: 'philosophical', viewValue: 'Philosophical' },
    { value: 'thriller', viewValue: 'Thriller' },
    { value: 'drama', viewValue: 'Drama' },
    { value: 'spiritual', viewValue: 'Spiritual' }
  ];

  constructor(private http: Http, private bookService: BookService, private snackBar: MatSnackBar)  {
    console.log("in AddNewBookComponent ");
  }

  ngOnInit() {
  }

  resetData(book): void {
    this.book = {};
    this.isbnFormControl.markAsUntouched();
    this.bookNameFormControl.markAsUntouched();
    this.bookGenreFormControl.markAsUntouched();
    this.bookGenreFormControl.setErrors(null);
    this.bookAuthorFormControl.markAsUntouched();
    //this.snackBar.open("Data has been reset.", "Done", {duration: 2000});
  }

  onSubmit(book: Book): void {
    let res: any;
    if (this.validateBookInputs(book)) {
      console.log("in");
      res = this.bookService.saveBook(book);
      if (res) {
        this.snackBar.open(book.name + " saved..!", "Done", {duration: 2000});
      }
    } else {
      this.snackBar.open("Fill in all the data please..!", "Okay", {duration: 3000});
    }
  }

  validateBookInputs(book: Book): Boolean {
    if(this.validateISBN(book.isbn) && this.validateBookName(book.name) && this.validateGenre(book.genre) && this.validateAuthor(book.author)) {
      return true;
    }
    return false;
  }

  validateISBN(isbn: any): any {
    if (isbn === undefined || isbn === null) {
      return false;
    }
    return true;
  }

  validateBookName(bookName: any): any {
    if (bookName === undefined || bookName === null || bookName === '') {
      return false;
    }
    return true;
  }

  validateGenre(genre: any): any {
    if (genre === undefined || genre === null || genre === '') {
      return false;
    }
    return true;
  }

  validateAuthor(author: any): any {
    if (author === undefined || author === null || author === '') {
      return false;
    }
    return true;
  }

}