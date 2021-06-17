import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Persona } from '../interface/persona';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // Express API route
  private api = 'http://localhost:3000/users';

  usuarios:Array<Persona> = [];

  constructor( private http: HttpClient) { }

  // Función de manejo de errores
  private handleError(operation: String) {
    return (err: any) => {
        let errMsg = `error in ${operation}() retrieving ${this.api}`;
        console.log(`${errMsg}:`, err)
        if(err instanceof HttpErrorResponse) {
            console.log(`status: ${err.status}, ${err.statusText}`);
        }
        return of(errMsg);
    }
  }


  //Funciones del CRUD:


  // Método GET /listar usuarios
  public getAllUsers(): Observable<any> {
    const path = `${this.api}`;
    return this.http.get(path)
    .pipe(
        catchError(this.handleError('getAllUsers')));
  }


  // Método GET /listar por id
  public getUserById(id : String): Observable<any>{
    const path = `${this.api}/${id}`;
    return this.http.get(path)
      .pipe(
        catchError(this.handleError('getUserById')));
  }
  

  // Método POST /crear usuario
  public addUser(user: Persona): Observable<any> {
    const path = `${this.api}/`;
    return this.http.post(path, user)
      .pipe(
          catchError(this.handleError('addUser')));
  }
  

  // Método PUT /actualizar usuario
  public updateUser(user: Persona, id : String): Observable<any> {
    const path = `${this.api}/${id}`;
    return this.http.put(path, user)
    .pipe(
      catchError(this.handleError('updateUser')));
  }


  // Método DELETE /eliminar usuario
  public deleteUser(id : String): Observable<any> {
    const path = `${this.api}/${id}`;
    return this.http.delete(path)
      .pipe(
        catchError(this.handleError('deleteUser')));   
  } 

}
