import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) =>({
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    authUser : null,
    isCheckingAuth : true,

    checkAuth : async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check');
            console.log(res.data);
            set({authUser:res.data});
        } catch (error) {
            console.log("Auth User Error: " );
            console.error(error);
            set({authUser:null});
        } finally{
          set({  isCheckingAuth:false})
        }
        
    }
}));