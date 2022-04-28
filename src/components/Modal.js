import React, { useState } from "react";
import './Modal.css'

function Modal(props){

    const [titleNote, setTitleNote] = useState('')
    const [contentNote, setContentNote] = useState('')
    const [errorContentValidate, setErrorContentValidate] = useState(false)

    function title(e){
        setTitleNote(e.target.value)
    }

    function content(e){
        setContentNote(e.target.value)
    }

    function createNote(event){
        event.preventDefault()

        const note = {
            id: Math.random().toString(36).substring(2),
            title: titleNote,
            content: contentNote,
            CreatedDate: new Date()
        }

        if(note.content === ''){
            setErrorContentValidate(true)
        }else{
            setErrorContentValidate(false)
            
            props.addNote(note)
            setTitleNote('')
            setContentNote('')
        }
 
    }

    function hideModal(e){

        if(e.target.id === 'Modal'){
            props.hideModal()
        }
    }

    return(
        <div onClick={hideModal} id='Modal' className={props.showModal ? "container-modal" : "container-modal hidden"}>
            <div className="note-inputs">
                <div> <h2>Crie sua Nota</h2> </div>
                <form>
                    <input type='text' onChange={title} placeholder='Digite o Titulo da Nota' value={titleNote}/>
                    {errorContentValidate && <span>Error, Conteudo não pode estar vazio</span>}
                    <textarea onChange={content} placeholder='Digite o Conteudo da Nota' value={contentNote}/>

                    <div>
                        <input className='create-note' type='submit' onClick={createNote} value='Criar Nota'/>
                        <input className='cancel-note' type='button' value='Cancel' onClick={()=>(props.hideModal())}/>                        
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Modal