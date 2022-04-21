import React, { useRef, useState } from 'react'
import Toggleable from './Toggleable'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const toggleableRef = useRef()

  const handleChange = ({ target }) => {
    setNewNote(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    toggleableRef.current.toggleVisibility()
  }

  return (
    <Toggleable buttonLabel={'New note'} ref={toggleableRef}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Create a new notes"
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Toggleable>
  )
}
