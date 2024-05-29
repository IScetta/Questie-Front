"use client";

import { useEffect, useState, useRef } from "react";
import { loadScript } from "@paypal/paypal-js";
import { PayPalNamespace } from "@paypal/paypal-js/types/index";
import { getProductById } from "@/helpers/products.helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createInvoice } from "@/helpers/invoices.helper";
import { MercadoPagoButton } from "../mercadopago/mercadopago";
import { addCoins } from "@/helpers/user.helper";
import { IProduct } from "@/app/types";
import { useUserContext } from "@/context/UserContext";

const Payment = ({ searchParams }: { searchParams: { productId: string } }) => {
  const [paypal, setPaypal] = useState<PayPalNamespace | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<IProduct|null>(null);
  const { payload, token } = useAuth();
  const parsedPayloadRef = useRef<any>(null);
  const route = useRouter();
  const { fetchUserStats } = useUserContext();

  useEffect(() => {
    if (typeof payload === "string") {
      parsedPayloadRef.current = JSON.parse(payload);
    } else {
      parsedPayloadRef.current = payload;
    }
  }, [payload]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await getProductById(searchParams.productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error getting product", error);
        setError("Failed to get product. Please try again later.");
      }
    };
    if(searchParams.productId)
    getProduct();
  }, [searchParams.productId]);

  useEffect(() => {
    const loadPaypalScript = async () => {
      try {
        const paypalInstance = await loadScript({
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          locale: "es_US",
          currency: "USD",
          intent: "capture",
        });

        setPaypal(paypalInstance);
      } catch (error: any) {
        console.error("Failed to load the PayPal JS SDK script", error);
        setError("Failed to load PayPal script. Please try again later.");
      }
    };
    loadPaypalScript();
  }, []);

  useEffect(() => {
    if (
      paypal &&
      paypal.Buttons &&
      product &&
      product.price > 0 &&
      token &&
      parsedPayloadRef.current
    ) {
      const paypalContainer = document.getElementById(
        "paypal-button-container"
      );

      if (paypalContainer && paypalContainer.childElementCount === 0) {
        paypal
          .Buttons({
            createOrder: function (data, actions) {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      value: product.price.toString(),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            },

            onApprove: async function (data, actions) {
              const invoice = await createInvoice(
                parsedPayloadRef.current.id,
                product.id,
                token!
              );

              if (product.data?.type === "coins") {
                const response = await addCoins(
                  token!,
                  parsedPayloadRef.current.id,
                  product.data?.qty!
                );
              }

              fetchUserStats();

              route.push(`/invoices?id=${invoice}`);
            },
          })
          .render("#paypal-button-container");
      }
    }
  }, [paypal, product, token, route, fetchUserStats]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center my-8 items-center">
      <div className="flex flex-col w-1/4 justify-between border shadow-xl rounded-lg p-4">
        {product ? (
          <div className="flex flex-col justify-start items-left mb-4 space-y-4 border-b pb-4">
            <Image
              src={product.imgUrl}
              alt={product.name}
              width={300}
              height={300}
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                objectFit: "cover",
                height: "20rem",
              }}
            />
            <span className="text-2xl font-bold">${product.price}</span>
            <p className="text-md font-bold">{product.name}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ) : (
          <div>Cargando producto...</div>
        )}

        {!payload ? (
          <div className="flex flex-col justify-center items-center mt-4 space-y-4">
            <p className="text-gray-600">
              Necesitas estar logueado para comprar.
            </p>
            <button
              className="py-2 px-4 rounded-lg bg-purpleMain hover:bg-purpleMainLight hover:text-gray-700 text-white"
              onClick={() => route.push("/sign-in")}
            >
              Iniciar sesión
            </button>
          </div>
        ) : paypal ? (
          <div className="flex w-full justify-center h-full">
            <div id="paypal-button-container"></div>
            <MercadoPagoButton product={product}/>
          </div>
        ) : (
          <div>Cargando PayPal...</div>
        )}
      </div>
    </div>
  );
};

export default Payment;
