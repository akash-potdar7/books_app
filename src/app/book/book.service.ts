import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http'
import { Book } from './book';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  constructor(private http: Http) {
    console.log("in BookService");
   }

  private getAllBooksSURL = '/api/allBooks';
  private staticUrl = 'assets/booksResult.json';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private saveBookSURL = '/api/saveBook';

  getBooks(): Observable<any> {
    //return this.http.get(this.staticUrl).map(response => response.json());
    return this.http.get(this.getAllBooksSURL).map(response =>{console.log(response.json()); return response.json()});
  }

  saveBook(book: Book): Promise<Book[]> {
    console.log("onSubmit ->in BookService.saveBook() book= "+ JSON.stringify(book));
    return this.http.post(this.saveBookSURL, JSON.stringify(book), {headers: this.headers})
        .toPromise()
        .then(response => {console.log(response);return response.json() as Book[]})
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("in BookService.handleError(): Error= "+error);
    return Promise.reject(error.message || error);
  }

}