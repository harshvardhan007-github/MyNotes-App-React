import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleDelete = (e) => {
        deleteNote(note._id);
    }

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={ () => { updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description} </p>


                </div>
            </div>
        </div> 
    )
}

export default Noteitem
