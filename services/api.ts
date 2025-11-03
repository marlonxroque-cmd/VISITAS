import type { User } from '../types';

// --- INSTRUCTIONS ---
// 1. Go to https://jsonbin.io/ and create a free account.
// 2. Create a new JSON bin and paste the initial user data into it.
// 3. Get your API Key from the "API Keys" page. This is your X_MASTER_KEY.
// 4. Get the URL of your bin (click the copy icon next to the bin name). The last part of the URL is your BIN_ID.
// 5. Replace the placeholder values below.

const API_KEY = '$2a$10$A.e4V7G1Uo./2W3O6pLe6u1gEcH56GS32Y96lT0GTde05g/E5b31W'; // This is your X_MASTER_KEY
const BIN_ID = '66a188f5e636bee0c7d877e1'; // The ID of your bin
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const LATEST_URL = `${BIN_URL}/latest`;


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


export const fetchUsers = async (): Promise<{ [key: string]: User }> => {
    const response = await fetch(LATEST_URL, {
        method: 'GET',
        headers: {
            'X-Master-Key': API_KEY,
            'X-Bin-Meta': 'false', // We only want the record content
        },
    });

    if (!response.ok) {
        // If the bin is empty or there's an error, it might return a 404 or other error code.
        // In that case, we'll initialize it with default data.
        console.warn(`Could not fetch data (status: ${response.status}). Initializing with default data.`);
        await saveUsers(INITIAL_USERS);
        return INITIAL_USERS;
    }

    const data = await response.json();
    
    // If the bin exists but is empty, initialize it.
    if (Object.keys(data).length === 0) {
        await saveUsers(INITIAL_USERS);
        return INITIAL_USERS;
    }
    
    return data;
};

export const saveUsers = async (users: { [key: string]: User }): Promise<void> => {
    const response = await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY,
        },
        body: JSON.stringify(users),
    });

    if (!response.ok) {
        throw new Error(`Failed to save data: ${response.statusText}`);
    }
};