import { useMainStore } from "../../App"

export async function getCarList(){
    const state = useMainStore.getState()
    const{setCarList,setCarListError,setCarListLoading} =state


    setCarListLoading(false)
    try{
        const res = await fetch('data.jsonc')

        if(res.ok){
            const json = await res.json()
            setCarList(json)
        }
        else{
            setCarListError(true)
            setCarList([])
        }
        setCarListLoading(false)
    }
    catch (error){
        console.log(error)
        setCarListLoading(false)
        setCarListError(true)
    }
}
export default getCarList