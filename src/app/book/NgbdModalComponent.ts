import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Book } from "./book";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../common/data.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { BookService } from "./book.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './updateBookModalTemplate.html'
  })
  export class NgbdModalComponent implements OnInit {

    header: string;
    private updateBookObj: any = {};
    private genres: any;

    constructor(public activeModal: NgbActiveModal, public dataService: DataService, private bookService: BookService) {
      this.header = 'Update: ';
    }

    ngOnInit(): void {
      let genres;
      this.bookService.getGenreDropDownData().subscribe(data => {
        genres = data;
        this.genres = genres;
      });
      let book: Book = this.dataService.getData();
      this.populateData(book);
    }

    populateData(book: Book) {
      console.log(book)
      this.updateBookObj = book;
    }

    updateBook(book: Book) {
      this.bookService.updateBook(book);
    }

    deleteBook(book: Book) {
      this.bookService.deleteBook(book);
    }

}