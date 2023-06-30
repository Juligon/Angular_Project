export class Person {
	id: number;
	nombre: string;
	apellido: string;
	edad: number;

	constructor(id: number, nombre: string, apellido: string, edad: number){
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.edad = edad;
	}

	public showName() : string{
		return this.nombre + " " + this.apellido;
	}

	public isAdult() : boolean{
		return this.edad >= 18;
	}
}