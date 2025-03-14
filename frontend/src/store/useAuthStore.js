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

    login : async(data)=>{
        try {
            set({isLogginIn:true});
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data});
            toast.success("Login Successful");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLogginIn:false});
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
    },
    
    updateProfile: async (data) =>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data);
            set({authUser:res.data});
            toast.success("Profile Updated Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isUpdatingProfile:false});
        }
    },
}));