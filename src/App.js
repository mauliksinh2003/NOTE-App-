import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      const result = await axios.get('http://localhost:5000/notes');
      setNotes(result.data);
    };
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    const result = await axios.post('http://localhost:5000/notes', note);
    setNotes([...notes, result.data]);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id) => {
    const note = notes.find(note => note.id === id);
    setIsEditing(true);
    setCurrentNote(note);
  };

  const updateNote = async (updatedNote) => {
    const result = await axios.put(`http://localhost:5000/notes/${updatedNote.id}`, updatedNote);
    setNotes(notes.map(note => (note.id === updatedNote.id ? result.data : note)));
    setIsEditing(false);
    setCurrentNote({ id: null, title: '', content: '' });
  };

  const handleInfiniteScroll =async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    window.addEventListener("scroll" , handleInfiniteScroll);
  },[])

  return (
    <div className="app">
      <h1>Notes App</h1>
      {isEditing ? (
        <AddNote onAdd={updateNote} note={currentNote} />
      ) : (
        <AddNote onAdd={addNote} />
      )}
      <NotesList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
};

export default App;
