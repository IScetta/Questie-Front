import axios from "axios"

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
    } catch (error) {
        console.error("Error creating lesson", error)
    }
}


export const deleteLessonBD = async(lesson_id:string , token:string)=>{
    try {
        const deleteLesson = await axios.delete(`${API_URL}lessons/${lesson_id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return deleteLesson.data;
    } catch (error) {
        console.error("Error creating module", error)
    }
}
