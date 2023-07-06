import "./Modal.css"
const Modal = ({closeModal, content}) => {
    return (
        <div className = "modal">
            <div className="modal_content">
                <div className="modal_header">
                    <button onClick={closeModal}> X </button>
                    
                </div>
                <div className="modal_content">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Modal