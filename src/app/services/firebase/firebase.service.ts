import { Injectable, signal } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getFirestore, 
  collection, 
  onSnapshot, addDoc, serverTimestamp, 
  setDoc,
  doc,
  Firestore,
  getDoc} from "firebase/firestore";
import { Cinguettio } from '../../model/cinguettio';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 


  // firebaseConfig = {
  //   apiKey: "AIzaSyCV6zyW_JUDnYmI7pN1BVPnRM3HIK9WMF8",
  //   authDomain: "cinguetto-88481.firebaseapp.com",
  //   projectId: "cinguetto-88481",
  //   storageBucket: "cinguetto-88481.firebasestorage.app",
  //   messagingSenderId: "562398177306",
  //   appId: "1:562398177306:web:04ac2b0e84e355855189a3"




    firebaseConfig = {
    apiKey: "AIzaSyA7ymoFr6ZVE0AEy-SNkrpLws95vcMq-cc",
    authDomain: "cinguetto-69d31.firebaseapp.com",
    projectId: "cinguetto-69d31",
    storageBucket: "cinguetto-69d31.firebasestorage.app",
    messagingSenderId: "1001473759556",
    appId: "1:1001473759556:web:6027bafeb24555a1f99f11"
  
  };

  db?: any;
  auth?: Auth;
  cinguettii = signal<Cinguettio[]>([])

  constructor() { }

currentUser = signal<any>(null); 
async init() {
  const app = initializeApp(this.firebaseConfig);
  this.db = getFirestore(app);
  this.auth = getAuth(app);

  onAuthStateChanged(this.auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(this.db, 'users', user.uid));
      this.currentUser.set({
        uid: user.uid,
        email: user.email,
        ...userDoc.data()
      });
    } else {
      this.currentUser.set(null);
    }
  });

}
  

  async login(email: string, password: string) {
    if (!this.auth) throw new Error('Auth not initialized');
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    if (!this.auth) throw new Error('Auth not initialized');
    return signOut(this.auth);
  }

  isAuthenticated() {
    return !!this.auth?.currentUser;
  }

  async getAllCinguettii() {
    //     const newArray: Cinguettio [] = [];
    //     const querySnapshot = await getDocs(collection(this.db, "cinguettii"));
    // querySnapshot.forEach((doc) => {
    //   const newCinguettio: Cinguettio = doc.data() as Cinguettio;
    //   newCinguettio.id = doc.id
    // newArray.push(newCinguettio);
    //   console.log(doc.id, " => ", doc.data());
    // });

    // this.cinguettii.update((_) => newArray)


    
    const unsubscribe = onSnapshot(collection(this.db, "cinguettii"), (snap) => {
      const newArray: Cinguettio[] = [];
      snap.forEach((doc) => {
        const newCinguettio: Cinguettio = doc.data() as Cinguettio;
        newCinguettio.id = doc.id
        newArray.push(newCinguettio);
       
      });
      this.cinguettii.update((_) => newArray)
    })
    
  }
  async addCinguettio(text: string, location?: { lat: number, lng: number }) {
    if (!this.db) throw new Error('Database non inizializzato');
    
    const cinguettioData = {
      text,
      authorNick: this.currentUser()?.nick || 'anonymous',  
      creationTime: serverTimestamp(), // Timestamp automatico di Firestore
      ...(location && { location }) // Aggiunge location solo se esiste
    };

    const docRef = await addDoc(collection(this.db, "cinguettii"), cinguettioData);
    return docRef.id;
  }

 

  async register(email: string, password: string, nick: string): Promise<void> {
    if (!this.auth) throw new Error('Auth not initialized');
    if (!this.db) throw new Error('Database not initialized');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      
      await this.saveUser(userCredential.user.uid, nick);
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Rilancia l'errore per la gestione nel componente
    }
  }

  private async saveUser(uid: string, nick: string): Promise<void> {
    const userDoc = {
      nick: nick,
      email: this.auth?.currentUser?.email, // Salva anche l'email per riferimento
      createdAt: serverTimestamp()
    };
    
    await setDoc(doc(this.db, 'users', uid), userDoc);
  }

}
