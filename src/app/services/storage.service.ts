import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageReady: Promise<Storage>;

  constructor(private storage: Storage) {
    this.storageReady = this.storage.create();
  }

  // Guardar datos
  async saveData(key: string, data: any): Promise<void> {
    const jsonData = JSON.stringify(data); // Serializar datos a JSON
    localStorage.setItem(key, jsonData);
  }
  

  // Obtener datos
  async getData(key: string): Promise<any> {
    const jsonData  =  localStorage.getItem(key);
    return jsonData  ? JSON.parse(jsonData ) : null; // Deserializar si los datos existen
  }
  

  // Eliminar datos
  async removeData(key: string): Promise<void> {
    const storage = await this.storageReady;
    await storage.remove(key);
  }

  // Limpiar todo el almacenamiento
  async clearStorage(): Promise<void> {
    const storage = await this.storageReady;
    await storage.clear();
  }
}
