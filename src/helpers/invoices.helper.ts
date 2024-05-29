import { IInvoice, IPayload } from "@/app/types";
import axios from "axios";
import Swal from "sweetalert2";

export const createInvoice = async (
  userId: string,
  productId: string,
  token: string
) => {
  try {
    const invoice = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}invoices`,
      {
        userId,
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return invoice.data;
  } catch (error: any) {
    console.error("Error creating invoice", error);
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
  }
};

export const getUserInvoices = async (payload: IPayload, token: string) => {
  try {
    const invoices = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}invoices`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userInvoices = await invoices.data.filter(
      (invoice: IInvoice) => invoice.user.id === payload.id
    );

    userInvoices.sort((a: IInvoice, b: IInvoice) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    const formattedInvoices = userInvoices.map((invoice: IInvoice) => {
      return {
        ...invoice,
        created_at: new Date(invoice.created_at).toLocaleDateString(),
      };
    });

    return formattedInvoices;
  } catch (error: any) {
    console.error("Error getting invoices", error);
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
  }
};

export const getInvoiceById = async (invoiceId: string, token: string) => {
  try {
    const invoice = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}invoices/${invoiceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return invoice.data;
  } catch (error: any) {
    console.error("Error getting invoice", error);
    Swal.fire({
      title: 'Oops...',
      text: error.response.data.message,
      icon: 'error'
    })
  }
};
