import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Home from '../pages/index'
import { useRouter } from 'next/router'
import { api } from '../services/api'

jest.mock('next/router')
jest.mock('../services/api')

beforeAll(() => {
  const useRouterMocked = mocked(useRouter)
  useRouterMocked.mockReturnValue({
    locale: 'en'
  } as any)
})

describe('Sign in Page', () => {

  it('Renders sign in button', () => {
    render(<Home />)

    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('Should register a new user', () => {
    const apiMocked = mocked(api.post)

    apiMocked.mockResolvedValueOnce({
      data: {
        _id: 'fake-id'
      }
    })

    const { getByText } = render(<Home />)

    const signInButton = getByText('Sign in')
    fireEvent.click(signInButton)

    expect(apiMocked).toHaveBeenCalledWith('/user' , { email: "" })
  })

  it('Should redirect a new user to dashboard', async () => {
    const apiMocked = mocked(api.post)
    const response = {
      data: {
        _id: "fake-id"
      }
    };
    apiMocked.mockResolvedValue(response)
    const useRouterMocked = mocked(useRouter)
    const pushMocked = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)
    
    const { getByText } = render(<Home />)

    const signInButton = getByText('Sign in')
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(pushMocked).toBeCalledWith('/dashboard')
    })
  })
})