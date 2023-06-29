export class User {
	id: number;
	name: string;
	lastName: string;
	age: number;

	constructor(id: number, name: string, lastName: string, age: number){
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.age = age;
	}

	public showName() : string{
		return this.name + " " + this.lastName;
	}

	public isAdult() : boolean{
		return this.age >= 18;
	}
}