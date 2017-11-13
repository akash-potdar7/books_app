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
  //private book: Book = new Book(456, 'Chasing Tomorrow', 'Thriller', 'Sydney Sheldon');
  private genres: any;
  
  public isbnFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(isbn_regex)]);
  public bookNameFormControl = new FormControl('',[ Validators.required ]);
  public bookGenreFormControl = new FormControl('',[ Validators.required ]);
  public bookAuthorFormControl = new FormControl('',[ Validators.required] );

  constructor(private http: Http, private bookService: BookService, private snackBar: MatSnackBar)  {
    console.log("in AddNewBookComponent ");
  }

  ngOnInit() {
    console.log("in AddNewBookComponent.ngOnInit()");
    this.getGenreData();
  }

  getGenreData() {
    this.bookService.getGenreDropDownData().subscribe(data => {
      console.log(data);
      this.genres = data;
    });
  }

  resetData(book): void {
    this.book = {}; // Need to take this off for the hard-coded form.
    this.isbnFormControl.markAsUntouched();
    this.bookNameFormControl.markAsUntouched();
    this.bookGenreFormControl.markAsUntouched();
    this.bookGenreFormControl.setErrors(null);
    this.bookAuthorFormControl.markAsUntouched();
    this.snackBar.open("Data has been reset.", "Done", {duration: 2000});
  }

  saveBook(book: Book): void {
    let res: any;
    if (this.validateBookInputs(book)) {
      let formattedBookJson: any;
      for (let entry of this.genres) {
        console.log(entry);
        if(entry.genre === book.genre) {
          formattedBookJson = entry;
        }
      }
      let formattedBook = {
        isbn: book.isbn,
        name: book.name,
        genre: formattedBookJson,
        author: book.author
      };
      book = formattedBook;
      console.log(book);
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