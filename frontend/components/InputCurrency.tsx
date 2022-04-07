import { ChangeEventHandler, SetStateAction } from "react"
import getTranslate from "../utils/translate"

type InputCurrencyProps = {
    setAmount: (amount: string) => void,
    setCurrentCurrency: (currency: string) => void
}

export default function InputCurrency({ setAmount , setCurrentCurrency }: InputCurrencyProps) {
  const translate = getTranslate()

  return (
    <div className="w-3/6 m-auto my-12">
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
        {translate["Amount"]}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="number"
          name="amount"
          id="price"
          onChange={(e) => setAmount(e.target.value)}
          className="p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-11/12 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            {translate["Currency"]}
          </label>
          <select
            id="currency"
            name="currency"
            onChange={(e) => setCurrentCurrency(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
          <option>GBP</option>
          <option>USD</option>
          </select>
        </div>
      </div>
    </div>
  )
}