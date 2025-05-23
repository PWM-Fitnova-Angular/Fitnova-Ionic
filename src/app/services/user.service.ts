import { Injectable } from '@angular/core';
import {getUserData} from "../firebase/firestore_utils";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  async getUserInfo() {
    return await getUserData();
  }

}
