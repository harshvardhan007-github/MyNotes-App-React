import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  //   const s1 = {
  //      "name": "Harry",
  //      "class": "5b"
  //   }

  //   const [state, setState] = useState(s1);

  //   const update = () => {
  //    setTimeout(() => {
  //       setState({
  //          "name": "Guru",
  //          "class": "10b"
  //       })
  //    }, 1000);
  //   }

  const host = "http://localhost:5000"

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API Call
    // We will be doing all the things in below code that we did on thunderclient 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDgxZTBlYjBhYmJiYmZjMWNkMzU3In0sImlhdCI6MTcxODY0OTMxMn0.fbrkbh-5eE5lLYRDM5gaj1Ed3NfD5VAk295VTwKBjhk"
      },
    });
    const json = await response.json(); // response contains all notes bcz we specified returning (res.send()) in the backend
    // console.log(json);
    setNotes(json); 
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    // We will be doing all the things in below code that we did on thunderclient 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDgxZTBlYjBhYmJiYmZjMWNkMzU3In0sImlhdCI6MTcxODY0OTMxMn0.fbrkbh-5eE5lLYRDM5gaj1Ed3NfD5VAk295VTwKBjhk"
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // response contains the added note
    // console.log(json);

    // for desplaying updated notes
    getNotes();

  }

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    // We will be doing all the things in below code that we did on thunderclient 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDgxZTBlYjBhYmJiYmZjMWNkMzU3In0sImlhdCI6MTcxODY0OTMxMn0.fbrkbh-5eE5lLYRDM5gaj1Ed3NfD5VAk295VTwKBjhk"
      },
    });
    const json = await response.json();
    // console.log(json);

    // for desplaying updated notes
    getNotes();

  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    // We will be doing all the things in below code that we did on thunderclient 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MDgxZTBlYjBhYmJiYmZjMWNkMzU3In0sImlhdCI6MTcxODY0OTMxMn0.fbrkbh-5eE5lLYRDM5gaj1Ed3NfD5VAk295VTwKBjhk"
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    
    // for desplaying updated notes
    getNotes();

    // Logic to edit in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //     break;
    //   }
    // }

  }

  return (
    //   <noteContext.Provider value={{state, update}}>
    //       {props.children}
    //   </noteContext.Provider>
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
