import { useRouter } from "next/router"
import { SetStateAction, useEffect, useState } from "react"
import { api } from "../services/api"
import formatCurrency from "../utils/formatCurrency"
import getTranslate from "../utils/translate"

type TableProps = {
    user: {
        email?: string
        _id?: string
    }
    trades: TradeProps[]
    setTrades: any
}

type TradeProps = {
    _id:string
    amount: number
    price: number
    date: string,
    originalCurrency: string
}

export default function TradesTable({ user , trades , setTrades }: TableProps){
    const { locale } = useRouter()
    const translate = getTranslate()

    useEffect(() => {
        if(user._id){
            api.get(`/trades/${user._id}`)
            .then(response => {
                setTrades(response.data.trades)
            })
        }
    },[user])

    return(
        <div className="w-3/6 m-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-10">
            <table className=" rounded w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {translate["Price"]}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {translate["Amount"]}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {translate["Total"]}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {translate["Date"]}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {translate["Original currency"]}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trades.map( trade => (
                            <tr key={trade._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {formatCurrency(trade.price, trade.originalCurrency === "GBP" ? "USD" : "GBP")}
                                </th>
                                <td className="px-6 py-4">
                                    {formatCurrency(trade.amount , trade.originalCurrency)}
                                </td>
                                <td className="px-6 py-4">
                                    {formatCurrency(trade.amount * trade.price , trade.originalCurrency === "GBP" ? "USD" : "GBP")}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(trade.date).toLocaleDateString(locale,{
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </td>

                                <td className="px-6 py-4">
                                    {trade.originalCurrency}
                                </td>
                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}