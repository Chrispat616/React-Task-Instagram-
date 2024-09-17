import { collection, getDocs, query, where  } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { useState } from "react";

const useSearchUser = () => {
 const [isLoading, setIsLoading] =useState(false)
 const [user, setUser] = useState(null)
 const showToast = useShowToast();
 const getUserProfile = async(username)=> {
    setIsLoading(true);
    setUser(null);
    try {
       const q = query(collection(firestore, "users"), where("username", "==", username)) 
       const querysnapshot = await getDocs(q)
       if(querysnapshot.empty) return showToast("Error", "User not found", "error")
       querysnapshot.forEach((doc) => {
         setUser(doc.data())
      })
    } catch (error) {
      showToast("Error", error.message, "error") 
      setUser(null) 
    }finally{
        setIsLoading(false)
    };
 };
   return {isLoading, getUserProfile, user, setUser}
};

export default useSearchUser;