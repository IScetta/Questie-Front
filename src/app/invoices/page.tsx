"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { IInvoice } from "../types";

const showAllInvoices = async () => {
  const { payload } = useAuth();

  if (!payload) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-4xl text-gray-700">
          Necesitas estar logueado para ver tus facturas.
        </p>
        <button className="py-2 px-4 rounded-lg bg-purpleMain hover:bg-purpleMainLight hover:text-gray-700 text-white">
          <a href="/sign-in">Iniciar sesión</a>
        </button>
      </div>
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}invoices`
    );

    const userInvoices = response.data.filter(
      (invoice: IInvoice) => invoice.userId === payload.id
    );

    return userInvoices;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default showAllInvoices;
