export class Personne {
  id: number;
  name: string;
  firstname: string;
  age: number;
  path: string;
  cin: number;
  job: string;
  constructor(id: number = 1,
              name: string = 'Name',
              firstname: string = 'FirstName',
              age: number = 0,
              path: string = 'profile.png',
              cin: number = 7777777,
              job: string = 'T3ebna'
  ) {
    this.id = id;
    this.name = name;
    this.firstname = firstname;
    this.age = age;
    this.path = path;
    this.cin = cin;
    this.job = job;
  }
}
