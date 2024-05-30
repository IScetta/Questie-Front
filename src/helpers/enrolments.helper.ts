import { IEnrolment } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkEnrolment = async (
  token: string | null,
  courseId: string,
  userId: string
) => {
  if (!token || !courseId || !userId) {
    return false;
  }

  try {
    const userEnrolments: AxiosResponse<IEnrolment[]> = await axios.get(
      `${API_URL}enrolments/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const courseEnrolments: string[] = userEnrolments.data.map(
      (enrolment: IEnrolment) => enrolment.course
    );

    return courseEnrolments.includes(courseId);
  } catch (error: any) {
    console.log(error.message);
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    throw new Error(error);
  }
};

export const createEnrolment = async (
  token: string | null,
  courseId: string,
  userId: string
) => {
  try {
    if (!token) {
      return null;
    }
  
    const response = await axios.post(
      `${API_URL}enrolments`,
      {
        courseId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (response.status === 201) {
      return response.data.id;
    } else {
      return null;
    }
  } catch (error: any) {
    console.log(error)
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
    
  }
};

export const getEnrolmentsByUser = async (
  token: string | null,
  userId: string
): Promise<IEnrolment[] | null> => {
  if (!token || !userId) {
    return null;
  }

  const response: AxiosResponse<IEnrolment[]> = await axios.get(
    `${API_URL}enrolments/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const userEnrolments: IEnrolment[] = response.data.filter(
    (enrolment: IEnrolment) => enrolment.user === userId
  );

  if (response.status === 200) return userEnrolments;
  return null;
};

export const getEnrolmentById = async (
  token: string | null,
  enrolmentId: string
) => {
  try {
    if (!token) {
      return null;
    }
  
    const response = await axios.get(`${API_URL}enrolments/${enrolmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error: any) {
    console.log(error)
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
  }
};
