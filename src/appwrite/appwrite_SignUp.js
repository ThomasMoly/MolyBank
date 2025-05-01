import { Client, Account, ID } from "appwrite";


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')    // Your API Endpoint
    .setProject(PROJECT_ID)                // Your project ID
;

const account = new Account(client);

export const createAccount = async (email, password, name) => {
    const result = await account.create(
        ID.unique(), // userId
        email, // email
        password, // password
        name // name (optional)
    );
}

export const accountLogin = async (email, password) => {
    try {
        const user = await account.get() // Check active session
        sessionStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
        return user
      } catch (error) {
        // No session — do nothing
      }
    const result = await account.createEmailPasswordSession(
        email, // email
        password // password
    );
}


