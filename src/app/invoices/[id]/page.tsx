import axios from "axios";

const ShowInvoice = async (id: string) => {
  return <h1>Factura</h1>;
  // try {
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API_URL}invoices/${id}`
  //   );
  //   return response.data;
  // } catch (error: any) {
  //   throw new Error(error.message);
  // }
};

export default ShowInvoice;
