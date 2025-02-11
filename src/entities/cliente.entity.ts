import { guardarCliente } from "../services/api/customer";

export class Usuario {
  idcustomer: string;
  telefono: string;
  dni: string;
  nombre: string | null;

  constructor(
    telefono: string,
    dni: string,
    nombre: string | null,
    idcustomer: string
  ) {
    this.telefono = telefono;
    this.dni = dni;
    this.nombre = nombre;
    this.idcustomer = idcustomer;
  }

  // Método para validcustomerar que el idcustomer tiene 9 dígitos
  validcustomeraridcustomer(): boolean {
    return String(this.telefono).length === 9;
  }

  // Método para validcustomerar que el dni tiene 8 dígitos numéricos
  validcustomerarDni(): boolean {
    return /^\d{8}$/.test(this.dni);
  }

  // Método para validcustomerar que el nombre no es nulo ni vacío
  validcustomerarNombre(): boolean {
    return this.nombre === null || this.nombre.trim() !== "";
  }

  // Método para validcustomerar todos los campos
  esValidcustomero(): boolean {
    return this.validcustomeraridcustomer() && this.validcustomerarDni() 
  }

  async crearUsuario(): Promise<any> {
    // Datos que se enviarán en el cuerpo de la solicitud POST
    this.esValidcustomero()
    const data = {
      "nombre": this.nombre,
      "dni": this.dni,
      "telefono": this.telefono,
      "idcustomer":this.idcustomer
    };

    try {
      // Realizamos la solicitud POST
      const response = await guardarCliente(data);
      return response;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
    }
  }
}
