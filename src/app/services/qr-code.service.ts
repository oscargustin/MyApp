import { Injectable } from '@angular/core';
import QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor() { }

  async generateQRCode(data: string): Promise<string> {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(data);
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      throw error;
    }
  }
}
