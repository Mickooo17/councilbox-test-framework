import fs from 'fs';
import path from 'path';
import { CreatedUserData } from './UserApiHelper';

const STORE_FILE = path.join(process.cwd(), 'playwright/.auth/created_users.json');

export class UserDataStore {
  private static inMemoryStore: CreatedUserData[] = [];

  private static loadFromFile(): CreatedUserData[] {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const content = fs.readFileSync(STORE_FILE, 'utf-8');
        return JSON.parse(content) || [];
      }
    } catch (err) {
      console.warn('[UserDataStore] Could not read users store file:', err);
    }
    return [];
  }

  private static saveToFile(list: CreatedUserData[]): void {
    try {
      const dir = path.dirname(STORE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STORE_FILE, JSON.stringify(list, null, 2));
    } catch (err) {
      console.warn('[UserDataStore] Could not save users store file:', err);
    }
  }

  /**
   * Saves a newly created user into both in-memory and file store.
   */
  static saveUser(data: CreatedUserData): void {
    this.inMemoryStore.push(data);
    const existing = this.loadFromFile();
    const updated = [data, ...existing.filter((item) => item.id !== data.id)];
    this.saveToFile(updated);
    console.log(`[UserDataStore] Saved user ID #${data.id} (${data.fullName} - ${data.email})`);
  }

  /**
   * Returns the most recently created user.
   */
  static getLatestUser(): CreatedUserData | null {
    if (this.inMemoryStore.length > 0) {
      return this.inMemoryStore[this.inMemoryStore.length - 1]!;
    }
    const fromFile = this.loadFromFile();
    return fromFile.length > 0 ? fromFile[0]! : null;
  }

  /**
   * Returns all stored users.
   */
  static getAllUsers(): CreatedUserData[] {
    const fromFile = this.loadFromFile();
    const map = new Map<number, CreatedUserData>();
    for (const user of [...this.inMemoryStore, ...fromFile]) {
      map.set(user.id, user);
    }
    return Array.from(map.values());
  }

  /**
   * Finds a stored user by its ID or Email.
   */
  static findUser(identifier: string | number): CreatedUserData | undefined {
    const idStr = String(identifier);
    return this.getAllUsers().find(
      (user) => String(user.id) === idStr || user.email === idStr
    );
  }

  /**
   * Updates an existing stored user with modified fields (e.g. after edit).
   */
  static updateUser(id: number, partialData: Partial<CreatedUserData>): CreatedUserData | undefined {
    const allUsers = this.getAllUsers();
    const userIndex = allUsers.findIndex((u) => u.id === id);
    if (userIndex === -1) return undefined;

    const updatedUser = { ...allUsers[userIndex]!, ...partialData };
    if (partialData.name || partialData.surname) {
      const name = partialData.name ?? updatedUser.name;
      const surname = partialData.surname ?? updatedUser.surname;
      updatedUser.fullName = `${name} ${surname}`;
    }

    allUsers[userIndex] = updatedUser;
    this.inMemoryStore = allUsers;
    this.saveToFile(allUsers);
    console.log(`[UserDataStore] Updated user ID #${id} (${updatedUser.fullName})`);
    return updatedUser;
  }

  /**
   * Clears saved users.
   */
  static clearStore(): void {
    this.inMemoryStore = [];
    try {
      if (fs.existsSync(STORE_FILE)) {
        fs.unlinkSync(STORE_FILE);
      }
    } catch {}
  }
}
