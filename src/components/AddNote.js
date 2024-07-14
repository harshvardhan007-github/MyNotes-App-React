import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e) =>{
        e.preventDefault(); // prevents page from reloading
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
    }

    // Below function is to change the value of note state variable, which will be used for adding the note item. If you change the description, then it will change the description part of the note state variable, as [description]: current value on input
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); 
        // console.log(note)
    }  

    return (

        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>

                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required /> {/* constraints like minLength and required do not work until we use onSubmit() instead of onClick(), So we use disable option on submit button*/}
                        {/* WE are specifying value of input field only bcz once note is added, it should become blank, there is no other purpose for that */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    
                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
                </form>

            </div>

        </div>
    )
}

export default AddNote
