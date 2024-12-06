import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageReady: Promise<Storage>; 

  constructor(private storage: Storage, private firestore: AngularFirestore) {
    // La creación del almacenamiento es una promesa que resuelve un objeto de tipo Storage
    this.storageReady = this.storage.create(); 
  }
  async addToArray(key: string, value: any): Promise<void> {
    const existing = (await this.storage.get(key)) || [];
    existing.push(value);
    await this.storage.set(key, existing);
  }

  async getArray(key: string): Promise<any[]> {
    return (await this.storage.get(key)) || [];
  }

  async clearStorage(): Promise<void> {
    await this.storage.clear();
  }


  // Guardar en localStorage
  async saveData(key: string, data: any): Promise<void> {
    const storage = await this.storageReady; 
    await storage.set(key, data);
  }

  // Obtener desde localStorage
  async getData(key: string): Promise<any> {
    const storage = await this.storageReady; 
    return storage.get(key);
  }

  // Guardar datos en Firebase (cuando haya conexión a internet)
  async saveDataToFirebase(collection: string, id: string, data: any): Promise<void> {
    this.firestore.collection(collection).doc(id).set(data);
  }

  // Recuperar datos de Firebase
  getDataFromFirebase(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).get();
  }
}
