import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book';
import { Http, RequestOptions } from '@angular/http';
import { BookService } from '../book/book.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  //private book: any = {};
  private book: Book = new Book(456, 'Chasing Tomorrow', 'Thriller', 'Sydney Sheldon');;

  genres = [
    {value: 'philosophical', viewValue: 'Philosophical'},
    {value: 'thriller', viewValue: 'Thriller'},
    {value: 'drama', viewValue: 'Drama'},
    {value: 'spiritual', viewValue: 'Spiritual'}
  ];

  constructor(private http: Http, private bookService: BookService) { 
    console.log("in AddNewBookComponent");
  }

  ngOnInit() {
  }

  onSubmit(book: Book): void {
    console.log(book.isbn);
    let res: any;
    res = this.bookService.saveBook(book);
    console.log("save() result= "+res);
  }

}
