

















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUhjUlpqNU5CVFdMLzdLL2svd25LSHIrSGRDSFVxeDNKbmpTZGxXbDRrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZJVTBicWdNbExDZzBuVW9FU2VTZUpRV0V3R0tEVFpHNVZmOUpNVXVtdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4SyswZ1N5ZUlSbW1CUUNBWGtMcXEyNXdEUUlaSWxxbm91YWp2Q1cwRkZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJNFlQdld6REpoSEVPQTZIUXloMmhFKzlBWm5XQnZaTWx1SlVPTm9qakRFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFPUUtHUERzTXRwSjI1Z3l6VXZwdVdRN3o4S09hdEVRNHpic3JHUnlRbmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhKOE9hQno3TWE4Z3BtMEZWQVdQL1FiQWhMai9zeXBzOERoeWFTLzJxVjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU5ldXN6dmhpY3dCVHplNHpESldENzVjV2QwTlpRK3lQUkRmLzZ6NDgxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEJYbFhOKzk0Rkk0cXM4cGJxU3Azam1nUUFrRllJWmttbFIwM21NSmlUdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1TaTViYjE2WDA3UFluUGVYUDFiYnNNZHFwQk9ZMmowWmNmM2V3M2RBSGhKbUI3MkNmYXF6Z2VJeHV3Rmg3cHE1ZmlhWUxaTTF2bW5oUzhCa0tPdGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc4LCJhZHZTZWNyZXRLZXkiOiJhRUVxWGtKZm1ENk5uRitDNXJVcDNlN1pqaVdYMTQ2ZGpMcWQ4SERlNTVFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxRTlxazBzVVRKV3JfaUpSb1VaWGNRIiwicGhvbmVJZCI6IjJlNWQ0Mjg0LTI4ZGEtNDdhNy05MDcwLTlmMzE5YTY5ZjE4OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5ckp5SFhrL0dyOUVZSks3Tis5NCtSdVVhL1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2daRHc3V240R2FoSWJTQWVpQm5WWk5FV3FjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5OQkEyWE04IiwibWUiOnsiaWQiOiIyMzQ4MDIwMzUyNDgyOjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4Y+m4Y+G4ZGO4Y+AIOGPpuGVvOGXqeOBl+GPhuGXniJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWVZd2Q0REVNRy94N2tHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWWduMll3MVFBMW9SZUtlNS91SS8vdGxvMFlpaklkNURsd3Rma09KSi9sUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaEhWaFVXMmRnVnRTWVZIZ0tXMnlua1Y1SUdsczhCS01qL2RPYkdDQXBjeXdUWFJ5SEd6TUF0TklDYmlvY0JoQ1Z5enNTSFpYRU1NZk5iRnVHZE53Q1E9PSIsImRldmljZVNpZ25hdHVyZSI6IjdPS2R0c0ZTVzZrQTNQWm5ObXgxUWZwSXVHUzlDdmx0TXZlMGw1cjVRbDNveGQxODBVWTA5eit4WGNpc1YvMTFZUjVMT0hyOTduNmJ5cWdHemlScmhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODAyMDM1MjQ4Mjo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldJSjltTU5VQU5hRVhpbnVmN2lQLzdaYU5HSW95SGVRNWNMWDVEaVNmNVUifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzEzMjE4MDksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS0s0In0=',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Reverse King",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Reverse King",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Reverse King',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/QXbR0M0/IMG-2996.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
