  import { Injectable } from '@angular/core';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'; 
  import { Firestore, collection, addDoc } from '@angular/fire/firestore';
  import { Router } from '@angular/router';
  import { ToastController } from '@ionic/angular';
  import { from } from 'rxjs';
import { StorageService } from './storage.service';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(
      private router: Router,
      private toastController: ToastController,
      private firestore: Firestore,
      private storageService:StorageService
    ) {}
    getCurrentUserUid(): string | null {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null; // Retorna el UID si el usuario está autenticado, de lo contrario null
    }
    // Registrar usuario y guardar información adicional en Firestore
    register(email: string, password: string, nombre: string, apellidos: string, nombreUsuario: string) {
      const auth = getAuth();  // Obtener la instancia de autenticación
      return from(
        createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
          // Guardar datos del usuario en Firestore, incluyendo nombre, apellidos, y nombreUsuario
          const usersCollection = collection(this.firestore, 'users');  // Define la colección
          return addDoc(usersCollection, {
            uid: userCredential.user.uid,
            email: email,
            nombre: nombre,  // Guardar nombre
            apellidos: apellidos,  // Guardar apellidos
            nombreUsuario: nombreUsuario,  // Guardar nombre de usuario
            createdAt: new Date()  // Fecha de creación
          });
        })
      );
    }
    
    async login(email: string, password: string): Promise<any> {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Delegar almacenamiento al StorageService
        await this.storageService.saveData('user', { uid: user.uid, email: user.email,  });
  
        return { success: true, user };
      } catch (error: any) {
        console.error('Error en login:', error);
        this.handleError(error.code);
        return { success: false, message: error.code };
      }
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
    async logOut() {
    try {
      const auth = getAuth(); // Obtener la instancia de autenticación
      await signOut(auth);
      console.log('Usuario ha cerrado sesión');
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
    }
  }

    // Manejo de errores
    handleError(errorCode: string) {
      console.log('Manejo de error:', errorCode); // Imprime el código del error

      switch (errorCode) {
        case 'auth/email-already-in-use':
          this.showToast('El correo ya está registrado.', 'warning');
          break;
        case 'auth/weak-password':
          this.showToast('La contraseña es muy débil. Escoja una más segura.', 'warning');
          break;
        default:
          this.showToast('Error inesperado.', 'warning');
          break;
      }
    }
  }

