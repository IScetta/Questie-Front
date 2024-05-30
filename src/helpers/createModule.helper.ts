import axios from "axios"
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const postCreateModule = async(
    title: string,
    description: string,
    course_id: string,
    token: string
)=>{
    try {
        const newModule = await axios.post(`${API_URL}modules`,
            [
             {   title,
                description,
                course_id,}
            ],
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return newModule.data;
    } catch (error: any) {
        console.error("Error creating module", error)
        Swal.fire({
            title: 'Oops...',
            text: error.response.data.message,
            icon: 'error'
          })
    }
}


export const deleteModuleBD = async(course_id:string , token:string)=>{
    try {
        const newModule = await axios.delete(`${API_URL}modules/${course_id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return newModule.data;
    } catch (error) {
        console.error("Error creating module", error)
    }
}
