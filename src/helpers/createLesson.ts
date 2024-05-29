import axios from "axios"
import Swal from "sweetalert2"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const postCreateLesson = async(
    title: string,
    order:number,
    xp:number ,
    coins:number ,
    module_id: string,
    token: string
)=>{
    console.log(coins)
    try {
        const newLesson = await axios.post(`${API_URL}lessons`,
            [{
                title,
                order:Number(order),
                xp:Number(xp),
                coins:Number(coins),
                module_id,
            }],
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return newLesson.data;
    } catch (error: any) {
        console.error("Error creating lesson", error)
        Swal.fire({
            title: 'Oops...',
            text: error.response.data.message,
            icon: 'error'
        })
    }
}
