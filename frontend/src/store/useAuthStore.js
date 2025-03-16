import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io}  from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) =>({
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    authUser : null,
    isCheckingAuth : true,
    onlineUsers: [],
    socket: null,
    
    checkAuth : async ()=>{
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser:res.data});
            get().connectSocket();
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
            toast.success("Account created Succesfully");
            get().connectSocket();
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
            get().connectSocket();
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
            get().disconnectSocket();
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

    connectSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;


        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        
        socket.connect();
        set({socket:socket});
        socket.on("getOnlineUsers", (userIds) =>{
            set({onlineUsers: userIds});
        });
    },

    disconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disconnect();
    },
}));