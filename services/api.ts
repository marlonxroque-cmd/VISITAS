import type { User } from '../types';

// The application will now use localStorage for data persistence
// to ensure reliability and offline functionality.
const LOCAL_STORAGE_KEY = 'visitor_app_users';

const INITIAL_USERS: { [key: string]: User } = {
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
 * Fetches users from localStorage. If no users are found,
 * it initializes the storage with a default set of users.
 */
export const fetchUsers = async (): Promise<{ [key: string]: User }> => {
    try {
        const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            // Basic validation to ensure essential users exist, otherwise reset.
            if (parsedUsers.admin1 && parsedUsers.security1) {
                return parsedUsers;
            }
        }
        // If data is missing, invalid, or doesn't exist, initialize.
        console.warn('No valid user data found in localStorage. Initializing with default data.');
        await saveUsers(INITIAL_USERS);
        return INITIAL_USERS;
    } catch (error) {
        console.error('Failed to parse user data from localStorage. Re-initializing.', error);
        await saveUsers(INITIAL_USERS);
        return INITIAL_USERS;
    }
};

/**
 * Saves the provided user data to localStorage.
 */
export const saveUsers = async (users: { [key: string]: User }): Promise<void> => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Failed to save data to localStorage:', error);
        // This would typically only fail if storage is full.
        throw new Error('Could not save user data. Storage might be full.');
    }
};
