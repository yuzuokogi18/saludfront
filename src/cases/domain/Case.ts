export class Case {
    constructor(
      public idExpediente: number,
      public idUsuario: number,
      public temperatura: number,
      public peso: number,
      public estatura: number,
      public ritmoCardiaco: number,
      public fechaRegistro: Date
    ) {}
  }
  