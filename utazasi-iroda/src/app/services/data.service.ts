import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
import { LoggedInPerson } from '../models/logged-in-person';
import { PersonLogin } from '../models/person-login';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loggedInUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  loginStatusChanged: any = new Subject<any>();

  BASE_URL = 'http://localhost:3000' // 'https://utazas.herokuapp.com' // 'http://localhost:3000'//
  accessToken: any = new Subject<any>();
  refreshToken: any = new Subject<any>();

  constructor(private http: HttpClient) { }

  login(personData:PersonLogin): Observable<LoggedInPerson> {
    return this.http.post<LoggedInPerson>(this.BASE_URL + '/login', personData)
    .pipe(
      tap(
        (loginData: LoggedInPerson) => {
          if(loginData) {
            localStorage.setItem('accessToken', loginData.accessToken);
            localStorage.setItem('refreshToken', loginData.refreshToken);
            this.loggedInUser.next({
              first_name: loginData.first_name,
              id: loginData.id,
              role: loginData.role
            })
          }
        },
        err => {
          console.error(err)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          this.loggedInUser.next(null);
        }
      )
    )
  }

  logout(data) {
    return this.http.post(this.BASE_URL + '/logout', data)
    .pipe(
      tap(response => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        this.loggedInUser.next(null)
      }, err => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        this.loggedInUser.next(null)
      })
    )
  }

  getPersonLoggedInObject() {
    return this.loggedInUser.asObservable()
  }

  get(url: string) {
       return this.http.get(`${this.BASE_URL}/${url}`)
  }

  getOne(url: string, id: any) {
    return this.http.get(`${this.BASE_URL}/${url}/${id}`)
  }
  post(url: string, data: any) {
    return this.http.post(`${this.BASE_URL}/${url}`, data)
  }
  put(url: string, id:any, data: any) {
    return this.http.put(`${this.BASE_URL}/${url}/${id}`, data)
  }

  delete(url: string, id:any) {
    return this.http.delete(`${this.BASE_URL}/${url}/${id}`);
  }

  getUserData() {
    return this.http.get(`${this.BASE_URL}/auth`)
  }
  refreshingToken(data:any) {
    return this.http.post(`${this.BASE_URL}/refresh`, data)
  }

  passwordChange(id:any, data: any) {
    return this.http.put(`${this.BASE_URL}/travellers/${id}/password`, data);
  }

}
