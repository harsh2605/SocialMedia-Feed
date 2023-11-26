import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware, alertMiddleware } from '../../state/index';
import { useHistory } from 'react-router-dom';


const AddNote = () => {
    const dispatch = useDispatch();
    const { addNewNote } = bindActionCreators(notesMiddleware, dispatch)
    const { showAlert } = bindActionCreators(alertMiddleware, dispatch)
    const [newNote, setNewNote] = useState({
        title: "",
        description: "",
        tag: "",
        status: ""
    });
    let history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            showAlert("Please Login to Continue", "warning");
            history.push("/auth/login");
        }
        // eslint-disable-next-line
    }, [])
    const handleSubmit = async (e) => {
        const json = await addNewNote(newNote.title, newNote.description, newNote.tag === '' ? 'default' : newNote.tag, newNote.status);
        if (!json.errors) {
            showAlert("Added Note Successfully", "success");
            history.push("/");
        } else {
            showAlert(json.errors.msg ? json.errors.msg : json.errors, "danger");
        }
    }
    const handleChange = (e) => {
        console.log(e.target.name,e.target.value)
        setNewNote({ ...newNote, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3" style={{border:"2px solid black",height:"40%",width:"70%",padding:"30px",borderRadius:"30px",backgroundImage: "linear-gradient(to right top, #090708, #121012, #181718, #1e1d1f, #232325, #232426, #232426, #232527, #1d2022, #181b1c, #131717, #0d1110)"}}>
            <h2 style={{marginLeft:"34%",color:"cyan"}}>Add Your Post</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={handleChange} id="title" name="title" value={newNote.title} aria-describedby="Title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={handleChange} id="description" name="description" value={newNote.description} aria-describedby="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={handleChange} id="tag" name="tag" value={newNote.tag} aria-describedby="tag" />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label" >Status</label>
                    <select name="status" id="" onChange={handleChange} className="form-control" aria-describedby="status">
                        <option selected disabled>Select an Option</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
            </form>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
        </div>
    )
}

export default AddNote
