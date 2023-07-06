import { useEffect, useState } from "react"

export function useCarList () {
    const [cars, setCars] = useState([])
    const [loading, setLoading]= useState(false)
    const [error, setError]= useState(false)


    async function getCarList() {
        try {
            
            const res = await fetch('data.jsonc')

            if (res.ok) {
                const json = await res.json()
                setCars(json)
    
            } else {
                setError(true)
                setCars([])
            }  

            setLoading(false)

        }catch (error)
            {
                console.log(error)
                setLoading(false)
                setError(true)
            }
        
    }

    useEffect(() =>
    {
        setLoading(true)
        getCarList()
    }, [])


    return {carList: cars, loading, error}
}