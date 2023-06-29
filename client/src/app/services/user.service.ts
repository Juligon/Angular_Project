import { Injectable } from "@angular/core";
import { User } from "../models/user";
import {
	Observable,
	of,
	catchError,
	throwError,
	map,
	mergeMap,
	first,
} from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class UserService {
	resourceUrl = environment.backendUrl + "users";

	constructor(private http: HttpClient) {}

	findAll(): Observable<HttpResponse<any[]>> {
		// return of(list).pipe(
		// 	catchError((error) => {
		// 		return throwError(error);
		// 	}),
		// 	map((users) => {
		// 		users.forEach((user) => (user.name = "Sr/Sra " + user.name));
		// 		return users;
		// 	})
		// );
		return this.http.get<any[]>(this.resourceUrl, { observe: "response" }).pipe(
			catchError((err) => {
				console.log("Ocurrió un error");
				return throwError(() => err);
			})
		);
	}

	findOne(id: number): Observable<HttpResponse<any>> {
		// return of(list).pipe(
		// 	mergeMap((user) => user),
		// 	first((user) => user.id === id)
		// );
		return this.http
			.get<any>(this.resourceUrl + "/" + id, { observe: "response" })
			.pipe(
				catchError((err) => {
					console.log("Ocurrió un error: ");
					console.log(err);
					return throwError(() => "Usuario inexistente!");
				})
			);
	}

	createUser(user: UserDTO): Observable<any> {
		return this.http.post<any>(this.resourceUrl, user).pipe(
			catchError((err) => {
				console.log("Ocurrió un error: ");
				console.log(err);
				return throwError(() => "No se pudo crear usuario");
			})
		);
	}

	updateUser(user: UserDTO): Observable<any> {
		return this.http.put<any>(this.resourceUrl + "/" + user.id, user).pipe(
			catchError((err) => {
				console.log("Ocurrió un error: ");
				console.log(err);
				return throwError(() => "Usuario inexistente!");
			})
		);
	}

	deleteUser(id: number): Observable<HttpResponse<any>> {
		return this.http
			.delete<any>(this.resourceUrl + "/" + id, { observe: "response" })
			.pipe(
				catchError((err) => {
					console.log("Ocurrió un error: ");
					console.log(err);
					return throwError(() => "Usuario inexistente!");
				})
			);
	}
}

export interface UserDTO {
	id: number;
	name: string;
	lastName: string;
	age: number;
}
