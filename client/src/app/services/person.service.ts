import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  resourceUrl = environment.backendUrl + 'personas';

  constructor(private http: HttpClient) {}

  findAll(): Observable<HttpResponse<any[]>> {
    // return of(list).pipe(
    // 	catchError((error) => {
    // 		return throwError(error);
    // 	}),
    // 	map((persons) => {
    // 		users.forEach((person) => (person.nombre = "Sr/Sra " + person.name));
    // 		return persons;
    // 	})
    // );
    return this.http.get<any[]>(this.resourceUrl, { observe: 'response' }).pipe(
      catchError((err) => {
        console.log('Ocurrió un error');
        return throwError(() => err);
      })
    );
  }

  findOne(id: number): Observable<HttpResponse<any>> {
    // return of(list).pipe(
    // 	mergeMap((person) => person),
    // 	first((person) => person.id === id)
    // );
    return this.http
      .get<any>(this.resourceUrl + '/' + id, { observe: 'response' })
      .pipe(
        catchError((err) => {
          console.log('Ocurrió un error: ');
          console.log(err);
          return throwError(() => 'Usuario inexistente!');
        })
      );
  }

  createPerson(persona: PersonDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, persona).pipe(
      catchError((err) => {
        console.log('Ocurrió un error: ');
        console.log(err);
        return throwError(() => 'No se pudo crear');
      })
    );
  }

  updatePerson(persona: PersonDTO): Observable<any> {
    return this.http
      .put<any>(this.resourceUrl + '/' + persona.id, persona)
      .pipe(
        catchError((err) => {
          console.log('Ocurrió un error: ');
          console.log(err);
          return throwError(() => 'Usuario inexistente!');
        })
      );
  }

  deletePerson(id: number): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(this.resourceUrl + '/' + id, { observe: 'response' })
      .pipe(
        catchError((err) => {
          console.log('Ocurrió un error: ');
          console.log(err);
          return throwError(() => 'Usuario inexistente!');
        })
      );
  }
}

export interface PersonDTO {
  id: number;
  name: string;
  lastName: string;
  age: number;
}
