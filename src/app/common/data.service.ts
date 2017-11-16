import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Book } from "../book/book";

@Injectable()
export class DataService {
    
    book: Book;

    constructor() {
        console.log('in DataService')
    }

    setData(book: Book) {
        this.book = book;
    }

    getData(): Book {
        return this.book;
    }

}