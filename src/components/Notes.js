import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
  }, [])

  const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "default" })

  const ref = useRef(null); // using useRef for taking reference
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    console.log("hello--");

  }

  const handleClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    console.log("updating the note...");

    editNote(note.eid, note.etitle, note.edescription, note.etag);
    refclose.current.click();

    // Setting the id to null so that any unwanted behavious does not show up
    // setNote({eid: null});
  }

  // Below function is to change the value of note state variable, which will be used for adding the note item. If you change the description, then it will change the description part of the note state variable, as [description]: current value on input
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(note)
  }

  return (
    <>
      <AddNote />

      {/* MODAL SNIPPET */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">  {/* d-none: Display null*/}
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* Bringing in the form to edit note */}
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
              {/*  */}

            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button display={(note.etitle.length < 3 || note.edescription.length < 5).toString()}  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 className="">Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'} { /* && operator is used instead of ? when there is no statement in else */}
        </div>
        {
          notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
          })
        }
      </div>
    </>
  )
}

export default Notes