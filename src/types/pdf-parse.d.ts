declare module "pdf-parse/lib/pdf-parse" {
  interface PDFData {
    text: string;
    numpages: number;
    info: never;
    metadata: never;
  }

  function pdf(dataBuffer: Buffer, options?: never): Promise<PDFData>;
  export default pdf;
}
