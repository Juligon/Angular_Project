import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  resourceUrl = environment.backendUrl + 'modelos';

  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<Model> {
    return this.http.get<Model>(this.resourceUrl + '/' + id).pipe(
      catchError((err) => {
        console.log(err.message);
        return throwError(() => 'Ocurrió un error');
      })
    );
  }
}
