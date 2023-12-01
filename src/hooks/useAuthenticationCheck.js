import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import {onAuthStateChanged,auth} from '../config/firebase'


export default function useAuthenticationCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
         onAuthStateChanged(auth, (user) => {
            if(user){
                dispatch(
                    userLoggedIn({
                        displayName:user.displayName,
                        email:user.email,
                        uid:user.uid,
                        photoURL:user.photoURL
                    })
                );
            }
          });
      
          setAuthChecked(true);  
          
        
    }, [dispatch, setAuthChecked]);

    return authChecked;
}