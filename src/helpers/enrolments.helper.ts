import { ICourse, IEnrolment } from "@/app/types";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkEnrolment = async (
  token: string | null,
  courseId: string,
  userId: string
) => {
  if (!token || !courseId || !userId) {
    return false;
  }

  const response = await axios.get(`${API_URL}enrolments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userEnrolments: IEnrolment[] = response.data.filter(
    (enrolment: IEnrolment) => enrolment.user === userId
  );

  const courseEnrolments: string[] = userEnrolments.map(
    (enrolment: IEnrolment) => enrolment.course
  );

  return courseEnrolments.includes(courseId);
};

export const createEnrolment = async (
  token: string | null,
  courseId: string,
  userId: string
) => {
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
};

export const getEnrolmentsByUser = async (
  token: string | null,
  userId: string
): Promise<IEnrolment[] | null> => {
  if (!token || !userId) {
    return null;
  }

  const response: AxiosResponse<IEnrolment[]> = await axios.get(
    `${API_URL}enrolments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const userEnrolments: IEnrolment[] = response.data.filter(
    (enrolment: IEnrolment) => enrolment.user === userId
  );

  if (response.status === 200) {
    return userEnrolments;
  } else {
    return null;
  }
};

export const getEnrolmentById = async (
  token: string | null,
  enrolmentId: string
) => {
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
};
