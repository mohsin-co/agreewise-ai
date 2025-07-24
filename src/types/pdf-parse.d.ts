declare module "pdf-parse/lib/pdf-parse" {
  interface PDFData {
    text: string;
    numpages: number;
    info: any;
    metadata: any;
  }

  function pdf(dataBuffer: Buffer, options?: any): Promise<PDFData>;
  export default pdf;
}
