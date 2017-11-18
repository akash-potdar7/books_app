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
  private getGenreData = '/api/getGenreData';
  private updateBookUrl = '/api/updateBook';
  private deleteBookUrl = '/api/deleteBook';

  getBooks(): Observable<any> {
    //return this.http.get(this.staticUrl).map(response => response.json());
    return this.http.get(this.getAllBooksSURL).map(response => {
      return response.json()
    });
  }

  saveBook(book: Book): Promise<Book[]> {
    return this.http.post(this.saveBookSURL, JSON.stringify(book), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Book[])
      .catch(this.handleError);
  }

  getGenreDropDownData(): Observable<any> {
    let data: any[];
    return this.http.get(this.getGenreData).map(response => response.json());
  }

  updateBook(book: Book): Promise<Book[]> {
    return this.http.post(this.updateBookUrl, JSON.stringify(book), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Book[])
      .catch(this.handleError);
  }

  deleteBook(book: Book): Promise<void> {
    return this.http.post(this.deleteBookUrl, JSON.stringify(book), { headers: this.headers })
      .toPromise()
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.log("in BookService.handleError(): Error= " + error);
    return Promise.reject(error.message || error);
  }

}