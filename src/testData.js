// src/testData.js
import CryptoJS from 'crypto-js';
import encryptedData from './encryptedTestData';

const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

export default decryptedData;
