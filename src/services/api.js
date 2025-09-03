import axios from "axios"

const API_URL = 'http://localhost:8080/api/v1'

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config)=>{

    const token = localStorage.getItem("token");
    


    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
})

export const register = (user)=> api.post('/auth/register', user)
export const login = (user)=> api.post('/auth/login', user)
export const getNotes = ()=> api.get('/notes/my-notes')
export const addNote = (note)=> api.post('/notes/create', note)
export const shareNote = (id)=> api.get(`/notes/public/${id}`)
export const deleteNote = (id)=> api.delete(`/notes/delete/${id}`)
