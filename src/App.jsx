import './App.css'

import { createContext, useContext, useEffect, useState } from "react"
import Content from './components/Content'
import Header from './components/Header'
import Modal from './components/Modal'
import Footer from './components/Footer'
import {create} from 'zustand'

// export const MainContext = createContext()

// export const useMainContext = () =>{
//     return useContext(MainContext)
// }

export const useMainStore = create(set => ({
    showModal: false,
    modalContent: undefined,
    carList: [],
    toggleShowModal: (content)=> set(state => toggleShowModal(state,content)),
    setCarList: (cars) => set({carList: cars}),
    carListLoading: false,
    carListError: false,
    setCarListError: (error) => set({carListError : error}),
    setCarListLoading: (loading) => set({carListLoading : loading}),
}))

function toggleShowModal(state,content){
    return {showModal: !state.showModal, modalContent:content}
}


function App(){

    const showModal = useMainStore( state => state.showModal)
    const modalContent = useMainStore(state=> state.modalContent)
    const toggleShowModal= useMainStore(state=> state.toggleShowModal)

    const mainStyle = {
        flex : "1"
    }

   


    return(<>
        
            <div style={mainStyle}>
                <Header/>
                <Content/>
                <Footer/>
            
            </div>
            {showModal && <Modal closeModal={toggleShowModal} content ={modalContent}/>}
        
        </>
    )
}

export default App