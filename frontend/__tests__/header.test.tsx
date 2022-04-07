import {  render } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'
import Header from '../components/Header'

jest.mock('next/router')
jest.mock('../services/api')

beforeAll(() => {
    const useRouterMocked = mocked(useRouter)
    useRouterMocked.mockReturnValue({
      locale: 'en'
    } as any)
})

describe('Header component', () => {
    const user = { 
        _id: 'fake-id',
        email: 'fake@fake.com'
    }

    it('Renders user email when logged', () => {
        const { getByText } = render(<Header user={user}/>)

        expect(getByText("Welcome, " + user.email)).toBeInTheDocument()
    })

    it('Renders loggin button when not logged', () => {
        const { getByText } = render(<Header user={{}}/>)

        expect(getByText("Login")).toBeInTheDocument()
    })
})