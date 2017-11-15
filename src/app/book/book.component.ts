import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Book } from './book';
import { Router } from '@angular/router';
import { BookService } from './book.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './updateBookModalTemplate.html'
})
export class NgbdModalContent {
  @Input() name;
  constructor(public activeModal: NgbActiveModal) {}

  save() {
    console.log('NgbdModalContent.save()');
  }
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: []
})
export class BookComponent implements OnInit {
  
  closeResult: string;

  book: Book;
  textGridCurrentPage: String = 'Total records: ';
  books: Book[];
  selectedBook: Book;
  stacked: boolean;
  totalRecords: number;

  constructor(private bookService: BookService, private modalService: NgbModal) {
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
    this.modalService.open(NgbdModalContent);
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  openDialog(content) {
    console.log(content+'1');
    this.modalService.open(content).result.then((result) => {
      console.log(content+'2');
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(content+'3');
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  save(data: any) {
    console.log('BookComponent.save()' + data);
  }

  /// modal 
  /*openDialog() {
    console.log("open()");
    this.modalService.open('rewrerew').result.then((result) => {
      console.log("opened result= " + result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log("failed! " + reason);
    });
  }*/

}
