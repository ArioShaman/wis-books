import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of, BehaviorSubject, ReplaySubject, from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map } from 'rxjs/operators';

import { SignUpForm } from '../../auth/models/sign-up-form.model';
import { ISignInForm } from '../../auth/models/sign-in-form.interface';
import { IUser } from '../models/user.interface';

const MOCK_USER: IUser = {
  id: 0,
  login: '',
  password: '',
  role: '',
  firstName: ''
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser$ = new BehaviorSubject<IUser>(MOCK_USER);
  private _isLogined$ = new BehaviorSubject<boolean>(false);


  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) { }

  public signIn(data: ISignInForm): Observable<any> {
    const uri = '/login';

    return this._http.post(uri, data);
  }

  public checkCache(): void {
    const localData = localStorage.getItem('currentUser');
    if (localData) {
      const currentUser = JSON.parse(localData);
      this._isLogined$.next(true);
      this._currentUser$.next(currentUser);
    }
  }

  public fakeSignIn(data: ISignInForm): Observable<any> {
    const url = 'http://localhost:4200/assets/users.json';

    return fromFetch(url)
      .pipe(
        switchMap((res: any) => {
          if (res.ok) {
            return from(res.json()).pipe(
              map((dataUsers: any) => {
                let islogined = false;

                dataUsers.users.forEach((user: IUser) => {
                  if (
                    user.login === data.email &&
                    user.password === data.password
                  ) {
                    this._currentUser$.next(user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    islogined = true;
                  }
                });

                this._isLogined$.next(true);

                return islogined;
              })
            );
          } else {
            return of({ error: true, message: `Error ${res.status}` });
          }
        }),
        catchError((err) => {
          return of({ error: true, message: err.message });
        })
      );
  }

  public logOut(): void {
    this._isLogined$.next(false);
    this._currentUser$.next(MOCK_USER);
    localStorage.setItem('currentUser', '');
    this._router.navigate(['/books']);
  }

  public signUp(data: SignUpForm): Observable<any> {
    const formData = data._toJSON();

    const uri = '/registration';

    return this._http.post(uri, formData);
  }

  public isLogined(): Observable<boolean> {
    return this._isLogined$.asObservable();
  }

  public isAuthenticated(): boolean {
    return this._isLogined$.getValue();
  }

  public getCurrentUser(): IUser {
    return this._currentUser$.getValue();
  }

}
