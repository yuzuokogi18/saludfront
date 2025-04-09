export class User {
    constructor(
      public id: number,
      public name: string,
      public rol: string,
      public email: string,
      public password: string,
      public username: string
    ) {}
  }
  
  export class UserLogIn {
    constructor(
      public username: string,
      public password: string
    ) {}
  }