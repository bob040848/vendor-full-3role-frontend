  declare module "react-qr-barcode-scanner" {
    import { ComponentType } from "react";

    type QrReaderProps = {
      width?: number;
      height?: number;
      onUpdate?: (err: any, result: any) => void;
      constraints?: MediaStreamConstraints;
    };

    const QrReader: ComponentType<QrReaderProps>;
    export default QrReader;
}
