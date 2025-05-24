import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({ providedIn: 'root' })
export class SqliteService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {}

  async initDatabase(): Promise<void> {
    if (this.dbInstance) return;

    try {
      const db = await this.sqlite.create({
        name: 'fitnova.db',
        location: 'default'
      });

      this.dbInstance = db;

      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS favourites (
                                                 id TEXT PRIMARY KEY,
                                                 content TEXT NOT NULL
         );`,
        []
      );


    } catch (error) {
      console.error('SQLite init error:', error);
    }
  }

  async saveFavourite(exercise: any): Promise<void> {
    if (!this.dbInstance) {
      await this.initDatabase();
    }
    console.log('Guardando ejercicio:', exercise);

    try {

      await this.dbInstance!.executeSql(
        'INSERT OR REPLACE INTO favourites (id, content) VALUES (?, ?);',
        [exercise.id, JSON.stringify(exercise)]
      );
    } catch (error) {
      console.error('Error saving favourite:', error);
    }
  }

  async getFavourites(): Promise<any[]> {
    if (!this.dbInstance) {
      await this.initDatabase();
    }

    try {
      const result = await this.dbInstance!.executeSql('SELECT * FROM favourites', []);
      const favourites: any[] = [];

      for (let i = 0; i < result.rows.length; i++) {
        const item = JSON.parse(result.rows.item(i).content);
        favourites.push(item);
      }

      return favourites;
    } catch (error) {
      console.error('Error reading favourites:', error);
      return [];
    }
  }

  async isFavourite(exerciseId: string): Promise<boolean> {
    if (!this.dbInstance) {
      await this.initDatabase();
    }

    const result = await this.dbInstance!.executeSql(
      'SELECT * FROM favourites',
      []
    );


    for (let i = 0; i < result.rows.length; i++) {
      const item = JSON.parse(result.rows.item(i).content);
      if (item.id === exerciseId) {
        return true;
      }
    }

    return false;
  }

  async deleteFavourite(exerciseId: string): Promise<void> {
    if (!this.dbInstance) {
      await this.initDatabase();
    }

    await this.dbInstance!.executeSql(
      'DELETE FROM favourites WHERE id = ?',
      [exerciseId]
    );

    console.log('✅ Ejercicio eliminado por id:', exerciseId);
  }




}

