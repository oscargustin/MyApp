import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private toastController: ToastController,
    private firestore: Firestore  // Inyecta Firestore
  ) {}

  // Registrar usuario y guardar información adicional en Firestore
  register(email: string, password: string) {
    const auth = getAuth();  // Obtener la instancia de autenticación
    return from(
      createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
        // Guardar datos del usuario en Firestore
        const usersCollection = collection(this.firestore, 'users');  // Define la colección
        return addDoc(usersCollection, {
          uid: userCredential.user.uid,
          email: email,
          createdAt: new Date()
        });
      })
    );
  }

  // Mostrar mensaje temporal
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // Mostrar durante 2 segundos
      color,          // Color basado en el tipo de mensaje
      position: 'top',
    });
    toast.present();
  }

  // Manejo de errores
  handleError(errorCode: string) {
    console.log('Manejo de error:', errorCode); // Imprime el código del error

    switch (errorCode) {
      case 'auth/email-already-in-use':
        this.showToast('El correo ya está registrado.', 'secondary');
        break;
      case 'auth/weak-password':
        this.showToast('La contraseña es muy débil. Escoja una más segura.', 'secondary');
        break;
      default:
        this.showToast('Error inesperado.', 'secondary');
        break;
    }
  }
}
