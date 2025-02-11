import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

//(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
(pdfMake as any).vfs = pdfFonts.vfs;

type Order = {
  nombre: string;
  cantidad: number;
  adicional: string;
};
const currentDate = new Date().toLocaleDateString("es-ES");

const generatePDF = (Order: Order[]) => {
  const content: any[] = [];
  //titulo
  content.push({
    columns: [
      {
        stack: [
          { text: `Orden de Cocina- Delivery`, style: "header" },
          { text: `Fecha: ${currentDate}`, style: "subheader" },
        ],
        alignment: "center",
      },
    ],
  });

  content.push({ text: "\n" });

  content.push({
    ul: [Order],
  });

  const styles = {
    header: {
      fontSize: 14,
      bold: true,
    },
  };

  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
