import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import TradesTable from '../components/TradesTable'
import { api } from '../services/api'
import formatCurrency from '../utils/formatCurrency'
import { io } from 'socket.io-client'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

type TradeProps = {
    _id:string
    amount: number
    usdPrice: number
    date: string
}

const Dashboard: NextPage = () => {
    const [isLoading , setIsLoading] = useState(false)
    const [price , setPrice] = useState(0)
    const [amount , setAmount] = useState(0)
    const [user , setUser] = useState({})
    const [trades , setTrades] = useState<TradeProps[]>([])

    useEffect(() => {
        const socket = io("http://localhost:8080")

        socket.on("price", (data) => {   
            setPrice(parseFloat(data.price))
        })

        api.get('/price')
        .then(response => setPrice(response.data.price))

        const userId = window.localStorage.getItem("userId")

        api.post('/user/login' , {
            userId
        }).then(response =>{
            if(response.data.user._id){
                setUser(response.data.user)
            }
        })
    },[])

    async function handleTrade(){
        const userId = window.localStorage.getItem("userId")
        if(!userId) return alert("Please log in to trade")

        setIsLoading(true)
        const response = await api.post('/trades', {
            usdPrice: price,
            amount,
            userId
        })

        setIsLoading(false)
        if(response.data){
            setTrades([...trades , response.data])
            return toast.success("Trade sucessfully!")
        }
        
        alert("Something went wrong!")
    }

    return (
    <div>
        <Head>
            <title>Forex App | Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      
        <Header user={user} />

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
            onClick={handleTrade}
            >
                {
                    isLoading ? <Spinner isLoading={isLoading}/> : 'Exchange'
                }
            </button>

            
        </div>
        
        <TradesTable user={user} trades={trades} setTrades={setTrades} />
    </div>
  )
}

export default Dashboard
