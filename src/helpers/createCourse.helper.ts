import { ICreateCourseForm } from "@/app/types";
import axios from "axios";

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
    } catch (error) {
        console.error("Error creating course:", error)
        throw error;
    }
};
