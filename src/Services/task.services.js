import {db} from '../firebase-config'

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
}  from 'firebase/firestore'
const collectionID = 'Task'
const authCollectionRef = collection(db, collectionID); 
class TaskDataService {
    addTask = (newAuth) =>{
        return addDoc(authCollectionRef,newAuth)
    }

    updateTask = (id,updatedAuth)=>{
        console.log(id,' id edit')
        console.log(updatedAuth,'updated auth')
        const authDoc = doc(db,collectionID,id);
        return updateDoc(authDoc,updatedAuth)
    };

    deleteTask = (id) =>{
        const authDoc = doc(db,collectionID,id);
        return deleteDoc(authDoc)
    } 

    getAllTask =()=> {
        return getDocs(authCollectionRef)
    }

    getTask = (id) =>{
        const authDoc = doc(db,collectionID,id)
        return getDoc(authDoc)
    }

}


export default new TaskDataService();

