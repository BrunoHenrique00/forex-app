import { SetStateAction, useEffect, useState } from "react"
import { api } from "../services/api"
import formatCurrency from "../utils/formatCurrency"

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
    usdPrice: number
    date: string
}

export default function TradesTable({ user , trades , setTrades }: TableProps){

    useEffect(() => {
        console.log(trades);
        
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
                            Price in USD
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trades.map( trade => (
                            <tr key={trade._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {formatCurrency(trade.usdPrice, "USD")}
                                </th>
                                <td className="px-6 py-4">
                                    {formatCurrency(trade.amount , "GBP")}
                                </td>
                                <td className="px-6 py-4">
                                    {formatCurrency(trade.amount * trade.usdPrice , "USD")}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(trade.date).toLocaleDateString('en-UK',{
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </td>
                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}