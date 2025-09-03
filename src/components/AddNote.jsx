import React, {useState} from 'react'
import { addNote } from '../services/api';

const AddNote = ({setNotePopup, fetchNotes}) => {


  const [newNote, setNewNote] = useState({
    title: '',
    content:''
  })


  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const response = await addNote(newNote)
      if(response.status == 201){
        setNotePopup(false);
        fetchNotes()
      }
    } catch (error) {
      log.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 p-5">
      <div className="w-full max-w-2xl bg-white/95 rounded-2xl shadow-2xl p-7 backdrop-blur">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-center mb-2">
          Add New Note
        </h1>
        <p className="text-center text-slate-500 mb-6">Provide a title and content for your note</p>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              value={newNote.title}
              onChange={(e)=> setNewNote({...newNote,title: e.target.value})}
              placeholder="e.g., Project Architecture Design"
              className="w-full rounded-xl border-2 border-slate-200 focus:border-indigo-400 outline-none bg-white px-4 py-3 text-slate-800 placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
            <textarea
              name="content"
              required
              value={newNote.content}
              onChange={(e)=> setNewNote({...newNote, content: e.target.value})}
              rows={8}
              placeholder="Start writing your note..."
              className="w-full rounded-xl border-2 border-slate-200 focus:border-indigo-400 outline-none bg-white px-4 py-3 text-slate-800 placeholder-slate-400 resize-y"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white text-slate-600 px-4 py-2"
              onClick={()=> setNotePopup(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center items-center rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg transition-shadow"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNote