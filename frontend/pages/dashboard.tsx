import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import TradesTable from '../components/TradesTable'
import InputCurrency from '../components/InputCurrency'
import { api } from '../services/api'
import formatCurrency from '../utils/formatCurrency'
import getTranslate from '../utils/translate'
import { io } from 'socket.io-client'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import ResultExchange from '../components/ResultExchange'

type TradeProps = {
    _id:string
    amount: number
    price: number
    date: string,
    originalCurrency: string
}

const Dashboard: NextPage = () => {
    const [isLoading , setIsLoading] = useState(false)
    const [price , setPrice] = useState(0)
    const [amount , setAmount] = useState(0)
    const [user , setUser] = useState({})
    const [trades , setTrades] = useState<TradeProps[]>([])
    const [currentCurrency , setCurrentCurrency] = useState("GBP")
    const [basePrice , setBasePrice] = useState(0)
    const translate = getTranslate() ;

    useEffect(() => {
        const socket = io("http://localhost:8080")

        socket.on("price", (data) => {
            setBasePrice(parseFloat(data.price))
        })

        getPriceAndSetPrice()
        getUserAndSetUser()
    },[])
    useEffect(() => {
        currentCurrency === "GBP" ? setPrice(basePrice) : setPrice(1 / basePrice)
    }, [basePrice])

    async function getPriceAndSetPrice(){
        try {
            const response = await api.get('/price')
            setPrice(response.data.price)
        } catch (error) {
            toast.error("Error while getting the price")
        }
    }

    async function getUserAndSetUser(){
        const userId = window.localStorage.getItem("userId")
        try {
            const response = await api.post('/user/login' , {
                userId
            })
            if(response.data.user._id){
                setUser(response.data.user)
                return 
            }
            toast.warn("Log in to trade!")
        } catch (error) {
            toast.warn("An error happened: " + error)
        }
    }

    async function handleTrade(){
        try {
            const userId = window.localStorage.getItem("userId")
            if(!userId) return toast.warn("Please log in to trade")
            if(amount <= 0) return toast.error("Please, put the amount")
            
            setIsLoading(true)
            
            const response = await api.post('/trades', {
                price,
                amount,
                userId,
                originalCurrency: currentCurrency
            })

            setIsLoading(false)
            if(response.data){
                
                setTrades([...trades , response.data])
                return toast.success("Trade sucessfully!")
            }
            toast.error("Something went wrong!")
        } catch (error) {
            toast.error("Something went wrong! " + error)
        }
    }

    function handleChangeAmount(value: string){
        setAmount(parseFloat(value))
    }

    function handleChangeCurrency(value: string){
        setCurrentCurrency(value)
        setPrice(1 / price)
    }

    return (
    <div>
        <Head>
            <title>Forex App | Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      
        <Header user={user} />

        <div className='w-3/6 m-auto mt-10 h-3/6 p-10 border border-gray-300 rounded flex flex-col'>
            <h2 className='font-bold m-auto'>{translate["Exchange"]} {currentCurrency} {translate["to"]} {currentCurrency === "GBP" ? "USD" : "GBP"}</h2>
            <span data-testid="realtime-price" className='m-auto mt-10 text-2xl'>
                {translate["Price:"]} {formatCurrency(price , currentCurrency === "GBP" ? "USD" : "GBP")}
            </span>

            <InputCurrency setAmount={handleChangeAmount} setCurrentCurrency={handleChangeCurrency} />

            {
                !!amount &&
                <ResultExchange amount={amount} price={price} currentCurrency={currentCurrency} />
            }
            <button
            className=' relative w-3/6 m-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
            text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500'
            onClick={handleTrade}
            data-testid="exchange-button"
            >
                {
                    isLoading ? <Spinner isLoading={isLoading}/> : translate['Exchange']
                }
            </button>

            
        </div>
        
        <TradesTable user={user} trades={trades} setTrades={setTrades} />
    </div>
  )
}

export default Dashboard
