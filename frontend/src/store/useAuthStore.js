import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

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
        
    },

    signUp:async (data)=>{
        try {
            set({isSigningUp:true});
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser:res.data});
            toast.success("Account created Succesfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false});
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("auth/logout");
            set({authUser:null});

            toast.success("Logged Out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}));