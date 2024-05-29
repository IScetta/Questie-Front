import { IProduct } from "@/app/types";
import { useAuth } from "@/context/AuthContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useEffect, useState } from "react";

export const MercadoPagoButton = ({
  product,
}: {
  product: IProduct | null;
}) => {
  const mercadopagoPublicKey: any =
    process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
  initMercadoPago(mercadopagoPublicKey, {
    locale: "es-AR",
  });

  const { payload, token } = useAuth();
  const [preferenceId, setPreferenceId] = useState("");
  useEffect(() => {
    const createPreference = async () => {
      try {
        const productMP = {
          ...product,
          quantity: 1,
          unit_price: product?.price,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}payments/mercado-pago`,
          productMP,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Idempotency-Key": "123",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { id } = response.data;
        setPreferenceId(id);
      } catch (error: any) {
        console.log("Error:", error);
      }
    };
    if (product && product.price) createPreference();
  }, [product, token]);
  return (
    <>{preferenceId ? <Wallet initialization={{ preferenceId }} /> : null}</>
  );
};
