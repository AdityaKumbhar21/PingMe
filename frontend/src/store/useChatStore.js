import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";


export const useChatStore = create((set, get)=>({
    users: [],
    messages: [], 
    isUserLoading: false,
    isMessagesLoading:false,
    selectedUser : null,

    getUsers : async ()=>{
        try {
            set({isUserLoading:true})
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        } catch (error) {
            console.log("Get Users error: " ,error);
            toast.error("Something went wrong");
        }
        finally{
            set({isUserLoading: false});
        }
    },

    getMessages: async (userId)=>{
        try {
            set({isMessagesLoading: true});
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            console.log("Get Messages error: " ,error);
            toast.error("Something went wrong");
        }
        finally{
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async (messageData) =>{
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    setSelectedUser: (user) => set({selectedUser:user}),
    
}));
