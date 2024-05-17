// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { getUserInvoices } from "@/helpers/invoices.helper";

const ShowAllInvoices = async () => {
  //   const { payload, token } = useAuth();

  //   if (!payload) {
  //     return (
  //       <div className="flex flex-col items-center justify-center h-screen space-y-4">
  //         <p className="text-4xl text-gray-700">
  //           Necesitas estar logueado para ver tus facturas.
  //         </p>
  //         <button className="py-2 px-4 rounded-lg bg-purpleMain hover:bg-purpleMainLight hover:text-gray-700 text-white">
  //           <a href="/sign-in">Iniciar sesión</a>
  //         </button>
  //       </div>
  //     );
  //   }

  return <h1>Facturas</h1>;

  //   try {
  //     const response = getUserInvoices(payload, token!);

  //     return response;
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
};

export default ShowAllInvoices;
