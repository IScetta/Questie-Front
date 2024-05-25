import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { useState } from 'react';

const MercadoPagoButton = (product: any) => {
    const mercadopagoPublicKey: any = process.env.MERCADOPAGO_PUBLIC_KEY;
    initMercadoPago(mercadopagoPublicKey, {
        locale: 'es-AR'
    })
    const [preferenceId, setPreferenceId] = useState('')
    const createPreference = async() => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}mercado-pago`, product)
            const { id } = response.data;
            setPreferenceId(id);
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return (
        <>
            <button onClick={createPreference}>Comprar con MercadoPago</button>
            {preferenceId ? <Wallet initialization={{ preferenceId }}/> : null }
        </>
    )
}