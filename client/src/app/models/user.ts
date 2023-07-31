export class User {
	id: number;
	name: string;
	lastname: string;
	age: number;

	constructor(id: number, name: string, lastname: string, age: number){
		this.id = id;
		this.name = name;
		this.lastname = lastname;
		this.age = age;
	}

	public showName() : string{
		return this.name + " " + this.lastname;
	}

	public isAdult() : boolean{
		return this.age >= 18;
	}
}