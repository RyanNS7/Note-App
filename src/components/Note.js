import { useState } from 'react';
import './Note.css'
import ReadNote from './ReadNote';

function Note(props){

    const [editedTitleNote, setEditedTitleNote] = useState(props.nota.title)
    const [editedContentNote, setEditedContentNote] = useState(props.nota.content)
    const [showEditNote, setShowEditNote] = useState(false)
    const [errorContentValidate, setErrorContentValidate] = useState(false)
    const [reading, setReading] = useState(false)
  
      function editTitle(e){
        setEditedTitleNote(e.target.value)
    }
  
    function editContent(e){
        setEditedContentNote(e.target.value)
    }

    function newNote(note){
        return note = {id: note.id, title: editedTitleNote, content: editedContentNote, CreatedDate: note.CreatedDate}
    }

    
  function showOrHide(){
        setShowEditNote(!showEditNote)
    }

    function hideModalEdit(e){

        if(e.target.id === 'Modal-box-edit'){
            showOrHide()
        }
    }

    return(
        <div key={props.chave} className='card-note'>
            <div className='complete-note' onClick={()=>{setReading(!reading)}}>
                <div className='title-note'><h3>{props.nota.title}</h3></div>
                <div className='content-note'><p>{props.nota.content}</p></div>
            </div>

            <div className='notes-buttons'>
                <button onClick={()=>{props.removeNote(props.nota.id)}}>remove note</button>
                <button onClick={showOrHide}>edit note</button>                
            </div>

            <div id='Modal-box-edit' onClick={hideModalEdit} className={showEditNote ? 'inputs-edit-note' : 'inputs-edit-note hidden' }> 
                <div className='box-edit'>
                    <div><h2>Edite sua Nota</h2></div>
                    <input className='edit-title-input' type='text' onChange={editTitle} value={editedTitleNote}/>
                    {errorContentValidate && <span>Error, Conteudo não pode estar vazio</span>}
                    <textarea className='edit-content-input' type='text' onChange={editContent} value={editedContentNote}/>
                    
                    <div>
                        <input className='switch-value-input' value='Editar' type='submit' onClick={()=>{
                                if(editedContentNote === ''){
                                    setErrorContentValidate(true)
                                }else{
                                    setErrorContentValidate(false)
                                    props.edit(newNote(props.nota), props.index)    
                                    showOrHide()
                                }
                            }}/>        

                        <input className='cancel-edit' type='button' value='Cancel' onClick={showOrHide}/>                  
                    </div>
              
                </div>
            </div> 

            <ReadNote title={editedTitleNote} content={editedContentNote} reading={reading} setReading={setReading}/>           
        </div>

    )
}

export default Note