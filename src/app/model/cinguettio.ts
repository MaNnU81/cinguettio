import { Timestamp } from "firebase/firestore"

export interface Cinguettio {
    id?: string
    text:string
    creationTime: Timestamp
    location?: {
        lat: number;
        lng: number;
      };
}
