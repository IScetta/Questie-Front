import { IInvoice, IPayload } from "@/app/types";
import axios from "axios";

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
  } catch (error) {
    console.error("Error creating invoice", error);
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
      (invoice: IInvoice) => invoice.userId === payload.id
    );

    return invoices.data;
  } catch (error) {
    console.error("Error getting invoices", error);
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
  } catch (error) {
    console.error("Error getting invoice", error);
  }
};
