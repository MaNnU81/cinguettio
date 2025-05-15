import { Injectable, signal } from '@angular/core';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { Cinguettio } from '../../model/cinguettio';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: "AIzaSyCV6zyW_JUDnYmI7pN1BVPnRM3HIK9WMF8",
    authDomain: "cinguetto-88481.firebaseapp.com",
    projectId: "cinguetto-88481",
    storageBucket: "cinguetto-88481.firebasestorage.app",
    messagingSenderId: "562398177306",
    appId: "1:562398177306:web:04ac2b0e84e355855189a3"
  };

  db?: any;

  cinguettii = signal<Cinguettio[]>([])

  constructor() { }

  init() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
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
}

