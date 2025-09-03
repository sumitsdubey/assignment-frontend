import React, { useContext, useEffect, useState } from 'react'
import { deleteNote, getNotes } from '../services/api'
import AddNote from './AddNote'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './AppContext'
import Loading from './Loading'

const Dashboard = () => {
  const [notes, setNotes] = useState([])

  const navigate = useNavigate();

  const {loading, setLoading } = useContext(AppContext)
  
  const [notePopup, setNotePopup] = useState(false);


  if(localStorage.getItem('token')==null){
    useEffect(()=>{
      navigate('/login')
    },[])
     
  }


  const fetchNotes = async ()=>{
    setLoading(true)
    try {
        const response = await getNotes();
        setNotes(response.data);
        setLoading(false)
    } catch (error) {
        console.error(error);
        setLoading(false)
    }
  }


  useEffect(()=>{
    fetchNotes();
  },[])

  const handleAddNote = () => {

    setNotePopup(true);
   
  }

  const handleShare = async (noteId) => {
    const url = `https://notesflow.app/shared/${noteId}`
    try {
      await navigator.clipboard.writeText(url)
      // Optional: toast/feedback could be added here
    } catch (_) {
      // Fallback
      alert(url)
    }
  }

  const handleDelete = async (noteId) => {
    setLoading(true)
    try {
      const res = deleteNote(noteId)
      if(res.tatus ==200){
        toast.success("Noets Deleted Success")
        fetchNotes()
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
      
  }


  const handleLogout = ()=>{
      localStorage.clear();
      navigate("/login")
      
  }


  return (
    <>

    {loading ? <Loading/> :
       
    notePopup? <AddNote setNotePopup= {setNotePopup} fetchNotes = {fetchNotes} /> : 
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 p-5">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-white text-2xl md:text-3xl font-extrabold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNote}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow hover:shadow-lg transition-shadow"
            >
              + Add Note
            </button>
            <button
              onClick={() =>handleLogout()}
              className="rounded-xl px-4 py-2 font-medium bg-white/90 text-slate-700 border border-white/60 backdrop-blur hover:bg-white"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length<=0 ? <div className='text-gray-200 text-xl text-center'>There is No Notes Added for this Account</div> :
          notes.map((n) => (
            <div key={n.id} className="bg-white/95 rounded-2xl shadow p-5 backdrop-blur border border-white/60">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-slate-900 font-semibold text-lg">{n.title}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(n.id)}
                    className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow transition-shadow"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow transition-shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                {n.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

        }
         </>
  )
  
}

export default Dashboard