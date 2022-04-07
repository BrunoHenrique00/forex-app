import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Dashboard from '../pages/dashboard'
import { api } from '../services/api'
import formatCurrency from '../utils/formatCurrency'
import { io } from 'socket.io-client';
import { useRouter } from 'next/router'
 
jest.mock('../services/api')
jest.mock('socket.io-client')
jest.mock('next/router')

beforeAll(() => {
  const useRouterMocked = mocked(useRouter)
  useRouterMocked.mockReturnValue({
    locale: 'en'
  } as any)
})

describe('Dashboard page', () => {

  const fakePrice = 1.3

  it('Renders Dashboard component', async () => {
    const socketMocked = mocked(io)
    const onMocked = jest.fn()
    socketMocked.mockReturnValueOnce({
      on: onMocked
    } as any)

    const { getByText } = render(<Dashboard />)
    const apiMocked = mocked(api.get)

    apiMocked.mockResolvedValueOnce({
        data: {
            price: fakePrice
        }
    })

    expect(apiMocked).toBeCalledWith('/price')
    expect(getByText("Price: " + formatCurrency(0, "USD"))).toBeInTheDocument()
  })

  it('Should update the price when socket is received', async () => {
    const socketMocked = mocked(io)
    const onMocked = jest.fn(() => ({
      price: fakePrice
    }))
    socketMocked.mockReturnValueOnce({
      on: onMocked
    } as any)

    const { findByText } = render(<Dashboard />)
    
    expect(await findByText("Price: " + formatCurrency(fakePrice, "USD"))).toBeInTheDocument()
  })

  it('Should add new trade', async () => {
    const fakeAmount = 10

    // Mocking of the localStorage
    Storage.prototype.getItem = jest.fn(() => 'fake-id');

    const socketMocked = mocked(io)
    const onMocked = jest.fn()
    socketMocked.mockReturnValueOnce({
      on: onMocked
    } as any)

    const apiMocked = mocked(api.post)

    apiMocked.mockResolvedValue({
        data: {
          _id: 'fake-id',
          amount: fakeAmount,
          date: Date.now().toString(),
          price: 0,
          originalCurrency: "GBP"
        }
    })

    const { getByPlaceholderText, getByTestId , findByText } = render(<Dashboard />)

    fireEvent.change(getByPlaceholderText("0.00"), {target: {value: fakeAmount}})

    const exchangeButton = getByTestId('exchange-button')
    
    fireEvent.click(exchangeButton)

    expect(apiMocked).toBeCalled()
    expect(await findByText(formatCurrency(fakeAmount , "GBP"))).toBeInTheDocument()
  })

})