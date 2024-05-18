"use client";

import { useAuth } from "@/context/AuthContext";
import { getUserInvoices } from "@/helpers/invoices.helper";
import { Table } from "flowbite-react/components/Table";
import { useEffect, useState } from "react";
import { IInvoice, IPayload } from "../types";

const ShowAllInvoices = () => {
  const { payload, token } = useAuth() as {
    payload: IPayload | string;
    token: string;
  };
  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  useEffect(() => {
    let parsedPayload: IPayload;

    if (typeof payload !== "object") {
      parsedPayload = JSON.parse(payload) as IPayload;
    } else {
      parsedPayload = payload as IPayload;
    }

    if (parsedPayload) {
      const fetchUserInvoices = async () => {
        const userInvoices = await getUserInvoices(parsedPayload, token);
        setInvoices(userInvoices);
      };
      fetchUserInvoices();
    }
  }, [payload, token]);

  if (!payload || (typeof payload !== "object" && !JSON.parse(payload))) {
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

  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-4xl text-gray-700">No tienes facturas.</p>
        <button className="py-2 px-4 rounded-lg bg-purpleMain hover:bg-purpleMainLight hover:text-gray-700 text-white">
          <a href="/shop">Ir a la tienda</a>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-1/2 my-8">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
        Facturas
      </h1>
      <div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Producto</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {invoices.map((invoice) => {
              return (
                <Table.Row
                  key={invoice.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-[#efe0ff]"
                >
                  <Table.Cell className="italic whitespace-nowrap font-medium text-gray-600 dark:text-white">
                    {invoice.product?.name}
                  </Table.Cell>
                  <Table.Cell>${invoice.total}</Table.Cell>
                  <Table.Cell>{invoice.created_at}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ShowAllInvoices;
