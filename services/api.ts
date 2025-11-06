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

  // Added Users
  'glenda': { role: 'resident', username: 'glenda', password: 'accediendo1', name: 'Glenda', lastName: 'Fuentes', block: '45', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'manuel': { role: 'resident', username: 'manuel', password: 'accediendo2', name: 'Manuel', lastName: 'Lopez Nieto', block: '45', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'miriam': { role: 'resident', username: 'miriam', password: 'accediendo3', name: 'Miriam', lastName: 'Oliva', block: '45', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'denis': { role: 'resident', username: 'denis', password: 'accediendo4', name: 'Denis', lastName: 'Marcelo Moreno M.', block: '45', house: '4', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'astor': { role: 'resident', username: 'astor', password: 'accediendo5', name: 'Astor', lastName: 'Aguilar', block: '45', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'guadalupe': { role: 'resident', username: 'guadalupe', password: 'accediendo6', name: 'Guadalupe', lastName: 'Madrid', block: '45', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'sindy': { role: 'resident', username: 'sindy', password: 'accediendo7', name: 'Sindy', lastName: 'Paola Fortin', block: '45', house: '7', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'samantha': { role: 'resident', username: 'samantha', password: 'accediendo8', name: 'Samantha', lastName: 'Izaguirre', block: '45', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'david': { role: 'resident', username: 'david', password: 'accediendo9', name: 'David', lastName: 'Vallejo', block: '44', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'mauricio': { role: 'resident', username: 'mauricio', password: 'accediendo10', name: 'Mauricio', lastName: 'Alexander Perez', block: '44', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jeferson': { role: 'resident', username: 'jeferson', password: 'accediendo11', name: 'Jeferson', lastName: 'Maradiaga', block: '44', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'hugo': { role: 'resident', username: 'hugo', password: 'accediendo12', name: 'Hugo', lastName: 'Salinas', block: '44', house: '4', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jose': { role: 'resident', username: 'jose', password: 'accediendo13', name: 'Jose', lastName: 'Eduardo Flores', block: '44', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'alejandrina': { role: 'resident', username: 'alejandrina', password: 'accediendo14', name: 'Alejandrina', lastName: 'Rodas Palma', block: '44', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'cesar': { role: 'resident', username: 'cesar', password: 'accediendo15', name: 'Cesar', lastName: 'Alfonzo Midence', block: '43', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'erick': { role: 'resident', username: 'erick', password: 'accediendo16', name: 'Erick', lastName: 'Alexis Godoy', block: '43', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'emilia': { role: 'resident', username: 'emilia', password: 'accediendo17', name: 'Emilia', lastName: 'Moreira Borjas', block: '43', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'carlos': { role: 'resident', username: 'carlos', password: 'accediendo18', name: 'Carlos', lastName: 'I. Andrade', block: '43', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'keidy': { role: 'resident', username: 'keidy', password: 'accediendo19', name: 'Keidy', lastName: 'C. Flores', block: '43', house: '7', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'carlos2': { role: 'resident', username: 'carlos2', password: 'accediendo20', name: 'Carlos', lastName: 'David Ayestas', block: '42', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'yamilet': { role: 'resident', username: 'yamilet', password: 'accediendo21', name: 'Yamilet', lastName: 'Ordoñez', block: '42', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'lesly': { role: 'resident', username: 'lesly', password: 'accediendo22', name: 'Lesly', lastName: 'Andino', block: '42', house: '13', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jarriett': { role: 'resident', username: 'jarriett', password: 'accediendo23', name: 'Jarriett', lastName: 'Jazmin Zuniga', block: '42', house: '14', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'dunia': { role: 'resident', username: 'dunia', password: 'accediendo24', name: 'Dunia', lastName: 'Imelda Castillo', block: '42', house: '16', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'gustavo': { role: 'resident', username: 'gustavo', password: 'accediendo25', name: 'Gustavo', lastName: 'Pineda Moreno', block: '41', house: '12', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'mercedes': { role: 'resident', username: 'mercedes', password: 'accediendo26', name: 'Mercedes', lastName: 'Roque', block: '41', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'clarissa': { role: 'resident', username: 'clarissa', password: 'accediendo27', name: 'Clarissa', lastName: 'Alexandra Martinez', block: '41', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'alejandro': { role: 'resident', username: 'alejandro', password: 'accediendo28', name: 'Alejandro', lastName: 'Hauserman', block: '40', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'exon': { role: 'resident', username: 'exon', password: 'accediendo29', name: 'Exon', lastName: 'Abenel Diaz', block: '40', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'nusly': { role: 'resident', username: 'nusly', password: 'accediendo30', name: 'Nusly', lastName: 'Mendez', block: '40', house: '4', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'gloria': { role: 'resident', username: 'gloria', password: 'accediendo31', name: 'Gloria', lastName: 'Obregon Ibarra', block: '40', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'cristian': { role: 'resident', username: 'cristian', password: 'accediendo32', name: 'Cristian', lastName: 'Banegas', block: '40', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'emerson': { role: 'resident', username: 'emerson', password: 'accediendo33', name: 'Emerson', lastName: 'Daniel Oyuela', block: '40', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'maryory': { role: 'resident', username: 'maryory', password: 'accediendo34', name: 'Maryory', lastName: 'Casco', block: '40', house: '7', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jerson': { role: 'resident', username: 'jerson', password: 'accediendo35', name: 'Jerson', lastName: 'Adalid Maldonado', block: '40', house: '12', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'karen': { role: 'resident', username: 'karen', password: 'accediendo36', name: 'Karen', lastName: 'Melisa Cruz', block: '40', house: '13', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'junior': { role: 'resident', username: 'junior', password: 'accediendo37', name: 'Junior', lastName: 'Sady Godoy', block: '40', house: '14', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'grebil': { role: 'resident', username: 'grebil', password: 'accediendo38', name: 'Grebil', lastName: 'Juarquin Vides', block: '40', house: '15', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'lisbet': { role: 'resident', username: 'lisbet', password: 'accediendo39', name: 'Lisbet', lastName: 'Nicole Reyes', block: '40', house: '17', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'gael': { role: 'resident', username: 'gael', password: 'accediendo40', name: 'Gael', lastName: 'Briceño', block: '40', house: '19', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'william': { role: 'resident', username: 'william', password: 'accediendo41', name: 'William', lastName: 'Naranjo', block: '40', house: '20', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'suamy': { role: 'resident', username: 'suamy', password: 'accediendo42', name: 'Suamy', lastName: 'Marilim Ramirez Canales', block: '39', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'nancy': { role: 'resident', username: 'nancy', password: 'accediendo43', name: 'Nancy', lastName: 'Rodas', block: '39', house: '10', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'marvin': { role: 'resident', username: 'marvin', password: 'accediendo44', name: 'Marvin', lastName: 'Jahir Velasquez', block: '39', house: '11', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jose2': { role: 'resident', username: 'jose2', password: 'accediendo45', name: 'Jose', lastName: 'Luis Garcia', block: '39', house: '12', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'dilcia': { role: 'resident', username: 'dilcia', password: 'accediendo46', name: 'Dilcia', lastName: 'Vasquez', block: '39', house: '13', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'marlon': { role: 'resident', username: 'marlon', password: 'accediendo47', name: 'Marlon', lastName: 'Xavier Ordonez', block: '39', house: '14', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'mayte': { role: 'resident', username: 'mayte', password: 'accediendo48', name: 'Mayte', lastName: 'Yasmin Tome Espinal', block: '39', house: '16', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'guillermo': { role: 'resident', username: 'guillermo', password: 'accediendo49', name: 'Guillermo', lastName: 'Enrique Matute', block: '39', house: '18', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'denia': { role: 'resident', username: 'denia', password: 'accediendo50', name: 'Denia', lastName: 'Sevilla', block: '39', house: '19', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'fanny': { role: 'resident', username: 'fanny', password: 'accediendo51', name: 'Fanny', lastName: 'Martinez', block: '39', house: '20', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'enmanuel': { role: 'resident', username: 'enmanuel', password: 'accediendo52', name: 'Enmanuel', lastName: 'Torres', block: '39', house: '21', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'junior2': { role: 'resident', username: 'junior2', password: 'accediendo53', name: 'Junior', lastName: 'Midence', block: '38', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'nadia': { role: 'resident', username: 'nadia', password: 'accediendo54', name: 'Nadia', lastName: 'Reyes Carranza', block: '38', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'claudia': { role: 'resident', username: 'claudia', password: 'accediendo55', name: 'Claudia', lastName: 'Lizeth Arteaga', block: '38', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'noe': { role: 'resident', username: 'noe', password: 'accediendo56', name: 'Noe', lastName: 'Fiallos', block: '38', house: '4', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'gerson': { role: 'resident', username: 'gerson', password: 'accediendo57', name: 'Gerson', lastName: 'Lopez', block: '38', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'gloria2': { role: 'resident', username: 'gloria2', password: 'accediendo58', name: 'Gloria', lastName: 'Medina', block: '38', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'helen': { role: 'resident', username: 'helen', password: 'accediendo59', name: 'Helen', lastName: 'Areli Flores Navas', block: '38', house: '7', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'keyla': { role: 'resident', username: 'keyla', password: 'accediendo60', name: 'Keyla', lastName: 'Carolina Herrera', block: '38', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'oscar': { role: 'resident', username: 'oscar', password: 'accediendo61', name: 'Oscar', lastName: 'Rivera', block: '38', house: '9', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'daniel': { role: 'resident', username: 'daniel', password: 'accediendo62', name: 'Daniel', lastName: 'Enrique Muñoz', block: '38', house: '10', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'francisca': { role: 'resident', username: 'francisca', password: 'accediendo63', name: 'Francisca', lastName: 'Rafaela Lopez', block: '38', house: '11', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'ruth': { role: 'resident', username: 'ruth', password: 'accediendo64', name: 'Ruth', lastName: 'Mendoza / Darling Irias', block: '38', house: '12', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'helen2': { role: 'resident', username: 'helen2', password: 'accediendo65', name: 'Helen', lastName: 'Jimenez', block: '38', house: '13', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'karen2': { role: 'resident', username: 'karen2', password: 'accediendo66', name: 'Karen', lastName: 'Iveth Oliva', block: '38', house: '14', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'heidy': { role: 'resident', username: 'heidy', password: 'accediendo67', name: 'Heidy', lastName: 'Melissa Vasquez', block: '38', house: '15', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'elvis': { role: 'resident', username: 'elvis', password: 'accediendo68', name: 'Elvis', lastName: 'Josue Mena', block: '38', house: '16', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'julio': { role: 'resident', username: 'julio', password: 'accediendo69', name: 'Julio', lastName: 'Cesar Galvez', block: '38', house: '17', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jose3': { role: 'resident', username: 'jose3', password: 'accediendo70', name: 'Jose', lastName: 'Adolfo Montes', block: '38', house: '18', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'oscar2': { role: 'resident', username: 'oscar2', password: 'accediendo71', name: 'Oscar', lastName: 'Sanchez', block: '37', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'mario': { role: 'resident', username: 'mario', password: 'accediendo72', name: 'Mario', lastName: 'Chavarria', block: '37', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'lorena': { role: 'resident', username: 'lorena', password: 'accediendo73', name: 'Lorena', lastName: 'Lacayo', block: '37', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'josue': { role: 'resident', username: 'josue', password: 'accediendo74', name: 'Josue', lastName: 'Daniel Lopez', block: '37', house: '4', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'luis': { role: 'resident', username: 'luis', password: 'accediendo75', name: 'Luis', lastName: 'Villalobos Lazo', block: '37', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'cinthia': { role: 'resident', username: 'cinthia', password: 'accediendo76', name: 'Cinthia', lastName: 'Gissela Mata M.', block: '37', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'evelyn': { role: 'resident', username: 'evelyn', password: 'accediendo77', name: 'Evelyn', lastName: 'Anaiz Lazo', block: '37', house: '7', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'aylin': { role: 'resident', username: 'aylin', password: 'accediendo78', name: 'Aylin', lastName: 'Michelle Portillo', block: '37', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'norman': { role: 'resident', username: 'norman', password: 'accediendo79', name: 'Norman', lastName: 'Roy Espinoza', block: '37', house: '9', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'adrian': { role: 'resident', username: 'adrian', password: 'accediendo80', name: 'Adrian', lastName: 'Leonardo Orellana', block: '37', house: '10', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jonathan': { role: 'resident', username: 'jonathan', password: 'accediendo81', name: 'Jonathan', lastName: 'Onierl Castellanos', block: '37', house: '11', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'zenia': { role: 'resident', username: 'zenia', password: 'accediendo82', name: 'Zenia', lastName: 'Sanchez', block: '37', house: '12', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'mauricio2': { role: 'resident', username: 'mauricio2', password: 'accediendo83', name: 'Mauricio', lastName: 'Diaz', block: '37', house: '13', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'ana': { role: 'resident', username: 'ana', password: 'accediendo84', name: 'Ana', lastName: 'Canales', block: '37', house: '14', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'paola': { role: 'resident', username: 'paola', password: 'accediendo85', name: 'Paola', lastName: 'Rivera', block: '37', house: '15', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'denys': { role: 'resident', username: 'denys', password: 'accediendo86', name: 'Denys', lastName: 'Gerardo Medina', block: '37', house: '16', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'joel': { role: 'resident', username: 'joel', password: 'accediendo87', name: 'Joel', lastName: 'Armando Reyes', block: '37', house: '17', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'abel': { role: 'resident', username: 'abel', password: 'accediendo88', name: 'Abel', lastName: 'Rodriguez', block: '37', house: '18', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'dexi': { role: 'resident', username: 'dexi', password: 'accediendo89', name: 'Dexi', lastName: 'Ferrufino', block: '37', house: '19', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'karen3': { role: 'resident', username: 'karen3', password: 'accediendo90', name: 'Karen', lastName: 'Yaneth Perdomo', block: '37', house: '20', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'isis': { role: 'resident', username: 'isis', password: 'accediendo91', name: 'Isis', lastName: 'Yaniny Perdomo', block: '37', house: '21', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'fernando': { role: 'resident', username: 'fernando', password: 'accediendo92', name: 'Fernando', lastName: 'Barahona', block: '37', house: '22', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jenny': { role: 'resident', username: 'jenny', password: 'accediendo93', name: 'Jenny', lastName: 'Lorena Coello Pineda', block: '37', house: '25', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'johan': { role: 'resident', username: 'johan', password: 'accediendo94', name: 'Johan', lastName: 'Eduardo Calix', block: '36', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'javier': { role: 'resident', username: 'javier', password: 'accediendo95', name: 'Javier', lastName: 'Baquedano', block: '36', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'junior3': { role: 'resident', username: 'junior3', password: 'accediendo96', name: 'Junior', lastName: 'Martinez', block: '36', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'fernando2': { role: 'resident', username: 'fernando2', password: 'accediendo97', name: 'Fernando', lastName: 'Amador', block: '36', house: '4', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'darwin': { role: 'resident', username: 'darwin', password: 'accediendo98', name: 'Darwin', lastName: 'Diaz', block: '36', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jose4': { role: 'resident', username: 'jose4', password: 'accediendo99', name: 'Jose', lastName: 'Ramon Vasquez', block: '36', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'maria2': { role: 'resident', username: 'maria2', password: 'accediendo100', name: 'Maria', lastName: 'Jose Serrano Mancias', block: '36', house: '7A', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'juan2': { role: 'resident', username: 'juan2', password: 'accediendo101', name: 'Juan', lastName: 'Carlos Flores', block: '36', house: '7B', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'ingris': { role: 'resident', username: 'ingris', password: 'accediendo102', name: 'Ingris', lastName: 'Yojana Fortin', block: '36', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'daniel2': { role: 'resident', username: 'daniel2', password: 'accediendo103', name: 'Daniel', lastName: 'Corrales', block: '36', house: '9', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'karla': { role: 'resident', username: 'karla', password: 'accediendo104', name: 'Karla', lastName: 'Almendarez', block: '36', house: '10', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'sammi': { role: 'resident', username: 'sammi', password: 'accediendo105', name: 'Sammi', lastName: 'A. Canan', block: '36', house: '11', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'esau': { role: 'resident', username: 'esau', password: 'accediendo106', name: 'Esau', lastName: 'Abimael Molina', block: '36', house: '12', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'claudia2': { role: 'resident', username: 'claudia2', password: 'accediendo107', name: 'Claudia', lastName: 'Odily Velasquez', block: '36', house: '13', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'yonathan': { role: 'resident', username: 'yonathan', password: 'accediendo108', name: 'Yonathan', lastName: 'Ariel Castillo Miranda', block: '36', house: '14', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'sandra': { role: 'resident', username: 'sandra', password: 'accediendo109', name: 'Sandra', lastName: 'Villalvir', block: '36', house: '15', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'orlando': { role: 'resident', username: 'orlando', password: 'accediendo110', name: 'Orlando', lastName: 'Asdrubal Villa Brizuela', block: '35', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'jeison': { role: 'resident', username: 'jeison', password: 'accediendo111', name: 'Jeison', lastName: 'Zelaya', block: '35', house: '2', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'sara': { role: 'resident', username: 'sara', password: 'accediendo112', name: 'Sara', lastName: 'Andrade', block: '35', house: '7', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'carlos3': { role: 'resident', username: 'carlos3', password: 'accediendo113', name: 'Carlos', lastName: 'Fajardo', block: '35', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'francis': { role: 'resident', username: 'francis', password: 'accediendo114', name: 'Francis', lastName: 'Zuseth Cuello', block: '35', house: '9', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'ana2': { role: 'resident', username: 'ana2', password: 'accediendo115', name: 'Ana', lastName: 'Cortes', block: '35', house: '10', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'olga': { role: 'resident', username: 'olga', password: 'accediendo116', name: 'Olga', lastName: 'Yadira Elvir', block: '35', house: '11', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'oscar3': { role: 'resident', username: 'oscar3', password: 'accediendo117', name: 'Oscar', lastName: 'Dubon', block: '34', house: '1', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'milagro': { role: 'resident', username: 'milagro', password: 'accediendo118', name: 'Milagro', lastName: 'Archaga', block: '34', house: '6', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'leonai': { role: 'resident', username: 'leonai', password: 'accediendo119', name: 'Leonai', lastName: 'Enrique Ramos', block: '34', house: '8', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'julio2': { role: 'resident', username: 'julio2', password: 'accediendo120', name: 'Julio', lastName: 'Meza', block: '34', house: '9', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'gustavo2': { role: 'resident', username: 'gustavo2', password: 'accediendo121', name: 'Gustavo', lastName: 'Blandin', block: '33', house: '3', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
  'walter': { role: 'resident', username: 'walter', password: 'accediendo122', name: 'Walter', lastName: 'Lanza', block: '33', house: '5', phone: '9999-9999', email: 'correo@residencialbriceno.com', paymentStatus: 'Al día' },
};

/**
 * Saves the provided user data to local storage.
 */
export const saveUsers = (users: { [key: string]: User }): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users to local storage:', error);
    throw new Error('Failed to save data.');
  }
};


/**
 * Fetches user data from local storage.
 * If no data is found, it initializes with default data.
 */
export const fetchUsers = (): { [key: string]: User } => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      // No data found, initialize with default users and save it
      console.warn("No local data found. Initializing with default data.");
      saveUsers(INITIAL_USERS);
      return INITIAL_USERS;
    }
  } catch (error) {
    console.error("Failed to load users from local storage.", error);
    // Fallback to initial users in case of parsing error
    return INITIAL_USERS;
  }
};
