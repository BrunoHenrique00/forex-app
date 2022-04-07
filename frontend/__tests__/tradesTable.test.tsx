import { fireEvent, render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'
import TradesTable from '../components/TradesTable'
import formatCurrency from '../utils/formatCurrency'

jest.mock('../services/api')
jest.mock('next/router')

beforeAll(() => {
  const useRouterMocked = mocked(useRouter)
  useRouterMocked.mockReturnValue({
    locale: 'en'
  } as any)
})

describe('TradesTable component', () => {
  const mockTrades = [{
    _id: 'fake-id',
    amount: 100,
    date: Date.now().toString(),
    price: 1.29,
    originalCurrency: "GBP"
  }]

  it('Renders TradesTable component', () => {
    const { getByText } = render(<TradesTable user={{}} trades={mockTrades} setTrades={jest.fn()} />)

    expect(getByText(formatCurrency(mockTrades[0].amount, "GBP"))).toBeInTheDocument()
    expect(getByText(formatCurrency(mockTrades[0].price, "USD"))).toBeInTheDocument()
    expect(getByText(new Date(mockTrades[0].date).toLocaleDateString('en-UK',{
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }))).toBeInTheDocument()
    expect(getByText(mockTrades[0].originalCurrency)).toBeInTheDocument()
  })

})