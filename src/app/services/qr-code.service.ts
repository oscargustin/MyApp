import { Injectable } from '@angular/core';
import QRCode from 'qrcode';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor() { }

  // Método para generar un código QR a partir de un string de datos
  async generateQRCode(data: string): Promise<string> {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(data);
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      throw error;
    }
  }

  // Método actualizado para escanear un código de barra o QR sin listeners deprecados
  async scanBarcode(): Promise<string | null> {
    try {
      // Oculta la interfaz para mostrar solo la cámara
      document.querySelector('body')?.classList.add('barcode-scanner-active');

      // Comienza el escaneo de un solo uso y limita el formato a QR codes (o incluye otros formatos según se necesite)
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode]
      });

      // Si hay códigos escaneados, devuelve el contenido del primero
      if (barcodes && barcodes.length > 0) {
        console.log('Código escaneado:', barcodes[0].displayValue);
        return barcodes[0].displayValue || null;
      } else {
        console.log('No se escanearon códigos');
        return null;
      }
    } catch (error) {
      console.error('Error al escanear el código:', error);
      throw error;
    } finally {
      // Restaura la visibilidad de la interfaz
      this.stopBarcodeScan();
    }
  }

  // Método para detener el escaneo de código de barras y restaurar la vista de la aplicación
  async stopBarcodeScan(): Promise<void> {
    // Restaura la visibilidad de los elementos en la interfaz
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    
    // Detén el escáner de código de barras si está en ejecución
    await BarcodeScanner.stopScan();
  }

  // Método para verificar y solicitar permisos de cámara
  async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.checkPermissions();
    if (camera !== 'granted') {
      const { camera: newCameraPermission } = await BarcodeScanner.requestPermissions();
      return newCameraPermission === 'granted';
    }
    return true;
  }
}
