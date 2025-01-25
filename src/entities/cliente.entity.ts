import { guardarCliente } from "../services/api/customer";

export class Usuario {
  id: string;
  telefono: number;
  dni: string;
  nombre: string | null;

  constructor(
    telefono: number,
    dni: string,
    nombre: string | null,
    id: string
  ) {
    this.telefono = telefono;
    this.dni = dni;
    this.nombre = nombre;
    this.id = id;
  }

  // Método para validar que el id tiene 9 dígitos
  validarId(): boolean {
    return String(this.telefono).length === 9;
  }

  // Método para validar que el dni tiene 8 dígitos numéricos
  validarDni(): boolean {
    return /^\d{8}$/.test(this.dni);
  }

  // Método para validar que el nombre no es nulo ni vacío
  validarNombre(): boolean {
    return this.nombre === null || this.nombre.trim() !== "";
  }

  // Método para validar todos los campos
  esValido(): boolean {
    return this.validarId() && this.validarDni() && this.validarNombre();
  }

  async crearUsuario(): Promise<any> {
    // Datos que se enviarán en el cuerpo de la solicitud POST
    const datosUsuario = {
      nombre: this.nombre,
      dni: this.dni,
      telefono: this.telefono,
      id:this.id
    };

    try {
      // Realizamos la solicitud POST
      const response = await guardarCliente(datosUsuario);
      return response;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
    }
  }
}
