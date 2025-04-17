import { Client, Databases, Query, ID } from "appwrite";


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_TV_ID = import.meta.env.VITE_APPWRITE_COLLECTION_TV_ID


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')    // Your API Endpoint
    .setProject(PROJECT_ID)                // Your project ID
;

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, tv) =>{
    //1. use Appwire SDK to check if the search term exisst in the database
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_TV_ID, [
            Query.equal('searchTerm', searchTerm)
        ])

    //2. if it does, update the count
        if(result.documents.length > 0){
            const doc = result.documents[0]
    
        await database.updateDocument(DATABASE_ID, COLLECTION_TV_ID, doc.$id, {
            count: doc.count + 1,
        })
            //3. if it doens't create a new docoument with the search term and count as 1
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_TV_ID, ID.unique(), {
            searchTerm,
            count: 1, 
            tv_id: tv.id,
            poster_URL: `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
        })
    }

    }catch (error){
        console.error(error)
    }
}

export const getTrendingShows = async() =>{
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_TV_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result
    } catch (error) {
        console.log(error)
    }
}