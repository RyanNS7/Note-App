
function ReadNote(props){

    function readingOrNot(){
        props.setReading(!props.reading)
    }

    function hideReading(e){

        if(e.target.id === 'container-read-note'){
            readingOrNot()
        }
    }

    return(
        <div id='container-read-note' onClick={hideReading} className={props.reading ? 'container-modal' : 'container-modal hidden'}>
            <div className="reading-box">
                <div>
                    <h2>{props.title}</h2>
                </div>

                <div className="note-content">
                    <p>{props.content}</p>
                </div>      

                <div className="finish-reading">
                    <button className="button-finish-reading" onClick={readingOrNot}>Finalizar Leitura</button>
                </div>       
            </div>

            

        </div>
    )
}

export default ReadNote