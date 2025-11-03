import type { User } from '../types';

// --- Local Storage Database ---
// To ensure 100% reliability and offline functionality, all data is stored
// in the browser's local storage. This eliminates network errors but means
// data is not synchronized across different browsers or devices.
const STORAGE_KEY = 'visitor_app_data';

const INITIAL_USERS: { [key:string]: User } = {
  'resident1': { 
    role: 'resident', 
    username: 'resident1', 
    password: 'password',
    name: 'Juan',
    lastName: 'Pérez',
    block: 'A',
    house: '101',
    phone: '555-1234',
    email: 'juan.perez@email.com',
    paymentStatus: 'Al día',
  },
   'resident2': { 
    role: 'resident', 
    username: 'resident2', 
    password: 'password',
    name: 'Maria',
    lastName: 'Gonzalez',
    block: 'B',
    house: '205',
    phone: '555-5678',
    email: 'maria.gonzalez@email.com',
    paymentStatus: 'Pendiente de pago',
  },
  'marlonx': {
    role: 'resident',
    username: 'marlonx',
    password: 'password',
    name: 'MARLON XAVIER',
    lastName: 'ORDOÑEZ ROQUE',
    block: '39',
    house: '14',
    phone: '0987654321',
    email: 'marlonx.roque@gmail.com',
    paymentStatus: 'Pendiente de pago',
  },
  'security1': { role: 'security', username: 'security1', password: 'password' },
  'admin1': { role: 'admin', username: 'admin1', password: 'password' },
};

/**
 * Fetches user data from local storage.
 * If no data is found, it initializes with default data.
 */
export const fetchUsers = async (): Promise<{ [key: string]: User }> => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      // No data found, initialize with default users and save it
      console.warn("No local data found. Initializing with default data.");
      await saveUsers(INITIAL_USERS);
      return INITIAL_USERS;
    }
  } catch (error) {
    console.error("Failed to load users from local storage.", error);
    // Fallback to initial users in case of parsing error
    return INITIAL_USERS;
  }
};

/**
 * Saves the provided user data to local storage.
 */
export const saveUsers = async (users: { [key: string]: User }): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users to local storage:', error);
    throw new Error('Failed to save data.');
  }
};
