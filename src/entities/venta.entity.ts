import { guardarVenta } from "../services/api/Venta";

export class Venta {
  idCliente: number; // ID del cliente (obligatorio)
  metodoPago: string; // Método de pago (obligatorio)
  status: string; // Status inicial (en proceso de pago)
  direccion: string | null; // Dirección, puede ser null
  horaRecogida: string | null; // Hora de recogida, puede ser null
  importe: number; // Importe, debe ser un número con decimales
  tipo: string;

  constructor(
    idCliente: number,
    metodoPago: string,
    direccion: string | null,
    horaRecogida: string | null,
    importe: number,
    tipo: string
  ) {
    this.idCliente = idCliente;
    this.metodoPago = metodoPago;
    this.status = "recibido"; // Status: recibido, confirmado, cancelado, enviado.
    this.direccion = direccion;
    this.horaRecogida = horaRecogida;
    this.importe = importe;
    this.tipo = tipo;
  }

  // Validación del idCliente (debe ser un número positivo)
  validarIdCliente(): boolean {
    return this.idCliente > 0;
  }

  // Validación de tipo
  validarTipo(): boolean {
    return this.tipo.trim() !== "delivery";
  }

  // Validación del método de pago (no puede estar vacío)
  validarMetodoPago(): boolean {
    return this.metodoPago.trim() !== "";
  }

  // Validación del importe (debe ser un número positivo con decimales)
  validarImporte(): boolean {
    return this.importe > 0 && !isNaN(this.importe);
  }

  // Validación del status (debe ser "en proceso de pago" o un estado válido)
  validarStatus(): boolean {
    return this.status === "en proceso de pago";
  }

  // Validación de dirección (puede ser null, o un string no vacío)
  validarDireccion(): boolean {
    return this.direccion === null || this.direccion.trim() !== "";
  }

  // Validación de hora de recogida (puede ser null, o un string no vacío)
  validarHoraRecogida(): boolean {
    return this.horaRecogida === null || this.horaRecogida.trim() !== "";
  }

  // Método que valida todos los campos de la compra
  esValido(): boolean {
    return (
      this.validarIdCliente() &&
      this.validarMetodoPago() &&
      this.validarImporte() &&
      this.validarStatus() &&
      this.validarDireccion() &&
      this.validarHoraRecogida()
    );
  }

  async crearVenta(): Promise<any> {
    // Datos que se enviarán en el cuerpo de la solicitud POST
    const datosUsuario = {
      metodo_de_pago: this.metodoPago,
      tipo_venta: this.tipo,
      direccion: this.direccion,
      hora_de_recojo: this.horaRecogida,
      estado: this.status,
      importe_total: this.status,
    };

    try {
      // Realizamos la solicitud POST
      const response = await guardarVenta(datosUsuario);
      return response;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
    }
  }
}
