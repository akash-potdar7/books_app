import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Book } from "./book";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../common/data.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './updateBookModalTemplate.html'
  })
  export class NgbdModalComponent implements OnInit {

    header: string;
    book: Book;

    constructor(public activeModal: NgbActiveModal, public dataService: DataService) {
      this.header = 'Update: ';
    }

    ngOnInit(): void {
      let book: Book = this.dataService.getData();
      this.populateData(book);
    }

    populateData(book: Book) {
      console.log(book)
      this.book = book;
    }

    //Implementation pending.
    updateBook() {
      console.log('NgbdModalContent.update()');
    }

}