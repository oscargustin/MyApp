  import { Injectable } from '@angular/core';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,updateEmail, updateProfile  } from 'firebase/auth'; 
  import { Firestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from '@angular/fire/firestore';
  import { Router } from '@angular/router';
  import { ToastController } from '@ionic/angular';
  import { from } from 'rxjs';
import { StorageService } from './storage.service';
import { Network } from '@capacitor/network';

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
          const usersCollection = collection(this.firestore, 'users');  // Define la colección
          return addDoc(usersCollection, {
            uid: userCredential.user.uid,
            email: email,
            nombre: nombre,  
            apellidos: apellidos,  
            nombreUsuario: nombreUsuario,  
            createdAt: new Date()  
          }); 
        })
      );
    }
    
  async login(email: string, password: string): Promise<any> {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener datos del usuario desde Firestore
    const userDocRef = doc(this.firestore, 'users', user.uid);
    const docSnapshot = await getDoc(userDocRef);
    const userData = docSnapshot.data();

    // Almacenar los datos completos del usuario en localStorage
    if (userData) {
      const userInfo = {
        uid: user.uid,
        email: user.email,
        nombre: userData['nombre'],
        apellidos: userData['apellidos'],
        nombreUsuario: userData['nombreUsuario']
      };

      await this.storageService.saveData('user', userInfo);
    }
    return { success: true, user };
  } catch (error: any) {
    console.error('Error en login:', error);
    this.handleError(error.code);
    return { success: false, message: error.code };
  }
}


    async isEmailRegistered(email: string): Promise<boolean> {
      const q = query(collection(this.firestore, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    }

    async resetPassword(email: string): Promise<void> {
      const auth = getAuth();
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error) {
        console.error('Error enviando correo de restablecimiento:', error);
        throw new Error('No se pudo enviar el correo de restablecimiento.');
      }
    }

  



    async updateUserProfile(uid: string, nombre: string, apellidos: string, nombreUsuario: string, email: string) {
      const auth = getAuth();
      const hasInternet = await this.checkNetworkStatus();
  
      if (!hasInternet) {
        this.showToast('No hay conexión a internet. No se puede actualizar el perfil.', 'warning');
        return;
      }
  
      try {
        const userRef = doc(this.firestore, 'users', uid);
        await updateDoc(userRef, {
          nombre,
          apellidos,
          nombreUsuario,
          email,
        });
  
        // Si todo es correcto, actualizar también los datos en Firebase Auth
        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, { displayName: nombreUsuario });
          await updateEmail(user, email);
        }
  
        this.showToast('Perfil actualizado con éxito.', 'success');
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        this.showToast('Hubo un error al actualizar el perfil.', 'danger');
      }
    }
  
    async checkNetworkStatus() {
      const status = await Network.getStatus();
      return status.connected;
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

