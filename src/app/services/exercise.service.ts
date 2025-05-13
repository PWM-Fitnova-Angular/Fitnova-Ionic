import { Injectable } from '@angular/core';
import {getAllDocumentsFromCollection} from "../firebase/firestore_utils";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  async getExercises() {
    const exercises = await getAllDocumentsFromCollection('exercises');
    const result = [];

    for (const exercise of exercises) {
      result.push({
        ...exercise,
        imageUrl: '/app/assets/img/' + exercise.imageName
      });
    }

    return result;
  }
}
