import { ICategory, ICourse, ICreateCourseForm } from "@/app/types";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postCreateCourse = async (formData:any, token: string) => {
    try {
        const response = await axios.post(
            `${API_URL}courses`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error creating course:", error)
        Swal.fire({
            title: 'Oops...',
            text: error.response.data.message,
            icon: 'error'
          })
        throw new Error(error)
    }
};

export const putCourse = async (formData:any, course_id:string, token:string) => {
    try {
        // const status = course.status
        const response = await axios.put(
            `${API_URL}courses/${course_id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error Update course:", error)
        Swal.fire({
            title: 'Oops...',
            text: error.response.data.message,
            icon: 'error'
          })
        throw new Error(error);
    }
};


export const putProductCourse = async ( course_id:string, token:string) => {
    try {
        // const status = course.status
        const isProduct: boolean = true 
        const response = await axios.put(
            `${API_URL}courses/${course_id}`,
            isProduct,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error Update course:", error)
        throw error;
    }
};

export const putCategoriesCourseDB = async ( categories:ICategory[] , course_id:string, token:string) => {
    try {
        const response = await axios.put(
            `${API_URL}courses/${course_id}`,
            categories,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error Update course:", error)
        throw error;
    }
};


export const putEditCourse = async (formData:any,course_id:string, token: string) => {
    try {
        const response = await axios.put(
            `${API_URL}courses/${course_id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error creating course:", error)
        Swal.fire({
            title: 'Oops...',
            text: error.response.data.message,
            icon: 'error'
          })
        throw new Error(error)
    }
};


