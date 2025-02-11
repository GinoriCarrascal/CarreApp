import { guardarDetVenta } from "../services/api/detventa";

export class DetalleVenta {
  idVenta: string; // Id de la compra (obligatorio)
  nombreProducto: string; // Id del producto (obligatorio)
  cantidad: number; // Cantidad (obligatoria, debe ser positiva)
  precio: number;
  adicional: string;
  precioad: number; // Precio unitario (obligatorio, debe ser un número decimal)
  importetotal: number; // Precio total (se calcula como cantidad * precio)

  constructor(
    idVenta: string,
    nombreProducto: string,
    cantidad: number,
    precio: number,
    adicional: string,
    precioad: number
  ) {
    this.idVenta = idVenta;
    this.nombreProducto = nombreProducto;
    this.adicional = adicional;
    this.cantidad = cantidad;
    this.precio = precio;
    this.precioad = precioad;
  }

  // Método para calcular el precio total (cantidad * precio unitario)
  private calcularPrecio(): number {
    return this.cantidad * this.precio;
  }

  private calcularPrecioTotal(): number {
    return this.precio + this.precioad;
  }

  // Validación de cantidad (debe ser un número positivo)
  validarCantidad(): boolean {
    return this.cantidad > 0;
  }

  // Validación de precio unitario (debe ser un número positivo)
  validarprecio(): boolean {
    return this.precio > 0 && !isNaN(this.precio);
  }

  // Validación de idVenta (debe ser un número positivo)

  validaridVenta(): boolean {
    return typeof this.idVenta === "string" && this.idVenta.trim().length > 4;
  }

  //ValidadnombredeProducto
  validarnombreProducto(): boolean {
    return (
      typeof this.nombreProducto === "string" &&
      this.nombreProducto.trim().length > 9
    );
  }

  // Método para validar todos los campos de DetalleVenta
  esValido(): boolean {
    return (
      this.validarCantidad() &&
      this.validarprecio() &&
      this.validaridVenta() &&
      this.validarnombreProducto()
    );
  }

  async CrearDetalleVenta(): Promise<any> {
    this.esValido()
    
    const datosUsuario = {
      "iddetven": this.idVenta,
      "nombre": this.nombreProducto,
      "cantidad": this.cantidad,
      "precio": this.precio,
      "adicionales": this.adicional,
      "importeadd": this.precioad,
      "importeham": this.calcularPrecio(),
      "importe": this.calcularPrecioTotal(),
    };

    try {
      // Realizamos la solicitud POST
      const response = await guardarDetVenta(datosUsuario);
      return response;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
    }
  }
}
