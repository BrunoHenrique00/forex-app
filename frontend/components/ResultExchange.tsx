import { useEffect, useState } from "react"
import formatCurrency from "../utils/formatCurrency"
import getTranslate from "../utils/translate"

type ResultExchangeProps = {
    amount: number,
    currentCurrency: string,
    price: number
}

export default function ResultExchange({ amount, currentCurrency , price }: ResultExchangeProps){
    const translate = getTranslate()
    return (
        <>
            <span className='m-auto mb-8'>
                {
                formatCurrency(amount,currentCurrency)} {currentCurrency}
                {translate["is equivalent to"]}
                {formatCurrency(parseFloat((amount * price).toFixed(3)), currentCurrency === "GBP" ? "USD" : "GBP")
                }
            </span>
        </>
    )
}