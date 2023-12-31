import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  resourceUrl = environment.backendUrl + 'trips';

  constructor(private http: HttpClient) {}

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: 'response' }).pipe(
      catchError((err) => {
        console.log(err.message);
        return throwError(() => 'Ocurrió un error');
      })
    );
  }

  findOne(id: number): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(this.resourceUrl + '/' + id, { observe: 'response' })
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return throwError(() => 'Viaje inexistente!');
        })
      );
  }

  createTrip(trip: TripDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, trip).pipe(
      catchError((err) => {
        console.log('Ocurrió un error: ');
        console.log(err);
        return throwError(() => 'No se pudo crear el viaje');
      })
    );
  }

  updateTrip(trip: TripDTO) {
    return this.http.put<any>(this.resourceUrl  + '/' + trip.id, trip).pipe(
      catchError((err) => {
        console.log('Ocurrió un error: ');
        console.log(err);
        return throwError(
          () => 'No se pudo actualizar el viaje con el id: ' + trip.id
        );
      })
    );
  }

  deleteTrip(id: number): Observable<any> {
		return this.http
			.delete<any>(this.resourceUrl + "/" + id)
			.pipe(
				catchError((err) => {
					console.log("Ocurrió un error: ");
					console.log(err);
					return throwError(() => "Viaje inexistente!");
				})
			);
	}
}

export interface TripDTO {
  id?: number;
  origin: string;
  destination: string;
  departure: Date;
  regress: Date;
  userId: number[];
  busId: number;
}