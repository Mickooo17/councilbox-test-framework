import fs from 'fs';
import path from 'path';

export interface ParticipantDetails {
  dni: string;
  idCardType: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  zipcode: string;
  country?: string;
  prefix?: string;
}

export interface CreatedAppointmentData {
  id: number;
  name: string;
  caseNumber: string;
  externalId?: string | null;
  dateStart: string;
  dateEnd: string;
  state: number;
  procedureId: number;
  procedureTitle: string;
  companyId: number;
  participant: ParticipantDetails;
  createdTimeMs: number;
  cancelReason?: string;
  cancelMessage?: string;
}

const STORE_FILE = path.join(process.cwd(), 'playwright/.auth/created_appointments.json');

export class AppointmentDataStore {
  private static inMemoryStore: CreatedAppointmentData[] = [];

  private static loadFromFile(): CreatedAppointmentData[] {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const content = fs.readFileSync(STORE_FILE, 'utf-8');
        return JSON.parse(content) || [];
      }
    } catch (err) {
      console.warn('[AppointmentDataStore] Could not read appointments store file:', err);
    }
    return [];
  }

  private static saveToFile(list: CreatedAppointmentData[]): void {
    try {
      const dir = path.dirname(STORE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STORE_FILE, JSON.stringify(list, null, 2));
    } catch (err) {
      console.warn('[AppointmentDataStore] Could not save appointments store file:', err);
    }
  }

  /**
   * Saves a newly created appointment into both in-memory store and file store.
   */
  static saveAppointment(data: CreatedAppointmentData): void {
    this.inMemoryStore.push(data);
    const existing = this.loadFromFile();
    const updated = [data, ...existing.filter((item) => item.id !== data.id)];
    this.saveToFile(updated);
    console.log(`[AppointmentDataStore] Saved appointment ID #${data.id} (${data.caseNumber})`);
  }

  /**
   * Updates an existing appointment in store (e.g. after cancellation or rescheduling).
   */
  static updateAppointment(id: number, partialData: Partial<CreatedAppointmentData>): void {
    const existing = this.loadFromFile();
    const updated = existing.map((item) => (item.id === id ? { ...item, ...partialData } : item));
    this.saveToFile(updated);

    this.inMemoryStore = this.inMemoryStore.map((item) =>
      item.id === id ? { ...item, ...partialData } : item
    );
  }

  /**
   * Returns the most recently created appointment.
   */
  static getLatestAppointment(): CreatedAppointmentData | null {
    if (this.inMemoryStore.length > 0) {
      return this.inMemoryStore[this.inMemoryStore.length - 1]!;
    }
    const fromFile = this.loadFromFile();
    return fromFile.length > 0 ? fromFile[0]! : null;
  }

  /**
   * Returns all stored appointments.
   */
  static getAllAppointments(): CreatedAppointmentData[] {
    const fromFile = this.loadFromFile();
    const map = new Map<number, CreatedAppointmentData>();
    for (const app of [...this.inMemoryStore, ...fromFile]) {
      map.set(app.id, app);
    }
    return Array.from(map.values()).sort((a, b) => b.createdTimeMs - a.createdTimeMs);
  }

  /**
   * Finds a stored appointment by its ID or Case Number.
   */
  static findAppointment(identifier: string | number): CreatedAppointmentData | undefined {
    const idStr = String(identifier);
    return this.getAllAppointments().find(
      (app) => String(app.id) === idStr || app.caseNumber === idStr
    );
  }

  /**
   * Clears saved appointments.
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
