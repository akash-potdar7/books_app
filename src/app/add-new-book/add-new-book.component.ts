import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book';
import { Http, RequestOptions } from '@angular/http';
import { BookService } from '../book/book.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

const isbn_regex = /^\d+$/;
const dataResetMsgS = 'Data has been reset.';
const dataResetMsgF = 'Reset mode is OFF. Cannot clear data.';
const done = 'Done';
const dataErr = 'Fill in all the data please..!';
const okay = 'okay';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {
  
  private book: any = {};
  //private book: Book = new Book(456, 'Chasing Tomorrow', 'Thriller', 'Sydney Sheldon');
  private genres: any;
  
  public isbnFormControl = new FormControl('', [ Validators.required, Validators.pattern(isbn_regex) ]);
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
    this.book = {};  // Need to comment this out for the hard-coded form.
    let resetMode = 'ON'; // Plus change this to ON when book is set empty.
    this.isbnFormControl.markAsUntouched();
    this.bookNameFormControl.markAsUntouched();
    this.bookGenreFormControl.markAsUntouched();
    this.bookGenreFormControl.setErrors(null);
    this.bookAuthorFormControl.markAsUntouched();
    if(resetMode === 'ON') {
      this.snackBar.open(dataResetMsgS, done, {duration: 2000});
    } else {
      this.snackBar.open(dataResetMsgF, done, {duration: 4000});
    }
  }

  saveBook(book: Book): void {
    let res: any;
    if (this.validateBookInputs(book)) {
      let formattedGenreJson: any;
      for (let entry of this.genres) {
        if(entry.genre === book.genre) {
          formattedGenreJson = entry;
        }
      }
      let formattedBook = {
        isbn: book.isbn,
        name: book.name,
        genre: formattedGenreJson,
        author: book.author,
        genreId: formattedGenreJson.id
      };
      book = formattedBook;
      res = this.bookService.saveBook(book);
      if (res) {
        this.snackBar.open(book.name + " saved..!", done, {duration: 2000});
      }
    } else {
      this.snackBar.open(dataErr, okay, {duration: 3000});
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