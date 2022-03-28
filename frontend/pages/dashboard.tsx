import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import TradesTable from '../components/TradesTable'
import formatCurrency from '../utils/formatCurrency'

const Dashboard: NextPage = () => {
    const [price , setPrice] = useState(1.36)
    const [amount , setAmount] = useState(0)

    return (
    <div>
        <Head>
            <title>Forex App | Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      
        <Header />

        <div className='w-3/6 m-auto mt-10 h-3/6 p-10 border border-gray-300 rounded flex flex-col'>
            <h2 className='font-bold m-auto'>Exchange GBP to USD</h2>
            <span className='m-auto mt-10 text-2xl'>Price: {formatCurrency(price , "USD")}</span>

            <input
                name="amount"
                type="number"
                required
                className="px-3 py-2 m-10 border border-gray-300 placeholder-gray-500 text-gray-900 
                rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Amount..."
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
            />

            {
                !!amount && <span className='m-auto mb-8'>{formatCurrency(amount,"GBP")} GBP is equivalent to {formatCurrency(parseFloat((amount * price).toFixed(3)), "USD")} USD</span>
            }
            <button
            className=' relative w-3/6 m-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
            text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500'
            >
                Exchange
            </button>

            
        </div>
        
        
    </div>
  )
}

export default Dashboard
