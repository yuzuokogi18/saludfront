export class Case {
    constructor(
      public idExpediente: number,
      public idUsuario: number,
      public temperatura: number,
      public peso: number,
      public estatura: number,
      public ritmo_cardiaco: number,
      public fechaRegistro: Date
    ) {}
  }
  