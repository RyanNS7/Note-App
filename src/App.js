import Modal from './components/Modal';
import Note from './components/Note';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [allNotes, setAllNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [boxConfirmation, setBoxConfirmation] = useState(false)


  function addNote(note){
    setAllNotes([...allNotes, note])
    hideModal()

  }

  function removeNote(id){
    setAllNotes(allNotes.filter((element) => {return element.id !== id}))
  }

  function edit(nota, index){

    allNotes[index] = nota

    setAllNotes([...allNotes])

  }

  function removeAllNotes(){
    setAllNotes([])
    localStorage.clear('Notes')
    setBoxConfirmation(false)
    
  }

  function show(){
    setShowModal(true)
  }

  function hideModal(){
    setShowModal(false)
  }

  useEffect(()=> {
    if(localStorage.getItem('Notes')){
      setAllNotes([...JSON.parse(localStorage.getItem('Notes'))])
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem('Notes', JSON.stringify(allNotes))  
  }, [allNotes])

  return (
    <>

    <div className='notes-configuration'>

      <div>
        <h2>App de Notas</h2>
      </div>

      <div className='buttons-configuration'>
        <button onClick={show}>Adicionar Nota</button> 
        <button onClick={()=>{setBoxConfirmation(!boxConfirmation)}}>Remover Todas as Notas</button>        
      </div>
     
    </div>

      <Modal addNote={addNote} showModal={showModal} hideModal={hideModal}/> 

      <div className='notes-box'>
        {allNotes.map((nota, index, key) => {
          return <Note nota={nota} edit={edit} removeNote={removeNote} index={index} chave={key}/>
        })}        
      </div>

      <div className={ boxConfirmation ? 'clear-confirmation' : 'hidden'}>
        <div className='text-confirmation'>
          <h2>Gostaria de Apagar todas as Notas?</h2>  
        </div>

        <div className='inputs-confirmation'>
          <input type='button' value='SIM' onClick={removeAllNotes}/>
          <input type='button' value='NÃO' onClick={()=>{setBoxConfirmation(!boxConfirmation)}}/>
        </div>
        
      </div>

    </>

  );
}

export default App;
