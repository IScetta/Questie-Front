import axios from "axios";
import Swal from "sweetalert2";

export const paypalPayment = async (productId: string, userId: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}payments/paypal`,
      {
        productId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5MmZmNjUxLTc1NWYtNGNmYi1iYjVjLTRlYTJkYzJiM2I4NSIsImVtYWlsIjoiam9obkRvZUBnbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4iLCJzdWIiOiI3OTJmZjY1MS03NTVmLTRjZmItYmI1Yy00ZWEyZGMyYjNiODUiLCJpYXQiOjE3MTU3MTU3ODIsImV4cCI6MTcxNTcyMjk4Mn0.g3Tf8lJM6N__vhIPs3Cf3zCjUe6IWybgz2AawsG6-Ow`,
        },
      }
    );
  
    //redirect to paypal
    window.location = response.data;
  } catch (error: any) {
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
  }
};
