import { Client, Databases, Query, ID } from "appwrite";


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_COMMENT_B_ID


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')    // Your API Endpoint
    .setProject(PROJECT_ID)                // Your project ID
;

const database = new Databases(client);

export const writeComment = async (comment, id, username) =>{
    try{
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            comment,
            Id: id,
            username: username,
        })
    }catch (error){
        console.error(error)
    }
}

export const getComments = async() =>{
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}