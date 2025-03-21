import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


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

    listenToMessages: ()=>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage)=>{
            const isMessageSentByUser = newMessage.senderId === selectedUser._id;
            if(!isMessageSentByUser) return;

            set({
                messages:[...get().messages, newMessage]
            });
        })
    },

    unsubscribeFromMessages : ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),
    
}));
