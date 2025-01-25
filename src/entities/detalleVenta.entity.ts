import { guardarDetVenta } from "../services/api/detventa";

export class DetalleVenta {
  idCompra: number; // Id de la compra (obligatorio)
  idProducto: number; // Id del producto (obligatorio)
  cantidad: number; // Cantidad (obligatoria, debe ser positiva)
  precio: number; // Precio unitario (obligatorio, debe ser un número decimal)
  importe: number; // Precio total (se calcula como cantidad * precio)

  constructor(
    idCompra: number,
    idProducto: number,
    cantidad: number,
    precio: number,
    importe: number
  ) {
    this.idCompra = idCompra;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.precio = precio;
    this.importe = this.calcularPrecioTotal();
    // Calculamos el precio total en el constructor
  }

  // Método para calcular el precio total (cantidad * precio unitario)
  private calcularPrecioTotal(): number {
    return this.cantidad * this.precio;
  }

  // Validación de cantidad (debe ser un número positivo)
  validarCantidad(): boolean {
    return this.cantidad > 0;
  }

  // Validación de precio unitario (debe ser un número positivo)
  validarprecio(): boolean {
    return this.precio > 0 && !isNaN(this.precio);
  }

  // Validación de idCompra (debe ser un número positivo)
  validarIdCompra(): boolean {
    return this.idCompra > 0;
  }

  // Validación de idProducto (debe ser un número positivo)
  validarIdProducto(): boolean {
    return this.idProducto > 0;
  }

  // Método para validar todos los campos de DetalleVenta
  esValido(): boolean {
    return (
      this.validarCantidad() &&
      this.validarprecio() &&
      this.validarIdCompra() &&
      this.validarIdProducto()
    );
  }

  async CrearDetalleVenta(): Promise<any> {
    const datosUsuario = {
      cantidad: this.cantidad,
      precio: this.precio,
      importe: this.importe,
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
