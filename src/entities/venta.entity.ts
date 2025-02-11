import { Console } from "console";
import { guardarVenta } from "../services/api/venta";

export class Venta {
  idVenta: string;
  idCliente: string; // ID del cliente (obligatorio)
  metodoPago: string; // Método de pago (obligatorio)
  tipo: string;
  direccion: string | null; // Dirección, puede ser null
  horaRecogida: string | null; // Hora de recogida, puede ser null
  importe: number; // Importe, debe ser un número con decimales
  estado: string; // estado inicial (en proceso de pago)

  constructor(
    idVenta: string,
    idCliente: string,
    metodoPago: string,
    direccion: string | null,
    horaRecogida: string | null,
    importe: number,
    tipo: string,
    estado: string = "en proceso de pago" // Valor por defecto
  ) {
    this.idVenta = idVenta;
    this.idCliente = idCliente;
    this.metodoPago = metodoPago;
    this.direccion = direccion;
    this.horaRecogida = horaRecogida;
    this.importe = importe;
    this.tipo = tipo;
    this.estado = estado; // Asignación de estado
  }

  // Validación del idCliente (debe ser un string no vacío)
  validarIdCliente(): boolean {
    return (
      typeof this.idCliente === "string" && this.idCliente.trim().length > 0
    );
  }

  // Validación de tipo
  validarTipo(): boolean {
    return this.tipo.trim() !== "delivery";
  }

  // Validación del método de pago (no puede estar vacío)
  validarMetodoPago(): boolean {
    return (
      this.metodoPago != null &&
      typeof this.metodoPago === "string" &&
      this.metodoPago.trim() !== ""
    );
  }

  // Validación del importe (debe ser un número positivo con decimales)
  validarImporte(): boolean {
    return this.importe > 0 && !isNaN(this.importe);
  }

  // Validación del estado (debe ser "en proceso de pago" o un estado válido)
  validarestado(): boolean {
    return this.estado === "recibido";
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
      this.validarestado() &&
      this.validarDireccion() &&
      this.validarHoraRecogida()
    );
  }

  async crearVenta(): Promise<any> {
    // Datos que se enviarán en el cuerpo de la solicitud POST
    this.esValido()
    const datosUsuario = {
      "metodo_de_pago": this.metodoPago,
      "tipo_venta": this.tipo,
      "direccion": this.direccion,
      "hora_de_recojo": this.horaRecogida,
      "importe_total": this.importe,
      "idVenta": this.idVenta,
      "customer": this.idCliente,
      "estado": this.estado,
    };

    console.log(datosUsuario)

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
