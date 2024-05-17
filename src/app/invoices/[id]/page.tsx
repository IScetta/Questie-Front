import axios from "axios";

const showInvoice = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}invoices/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default showInvoice;
