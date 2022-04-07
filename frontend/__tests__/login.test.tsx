import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'
import Login from '../pages/login'
import { api } from '../services/api'

jest.mock('../services/api')
jest.mock('next/router')

beforeAll(() => {
  const useRouterMocked = mocked(useRouter)
  useRouterMocked.mockReturnValue({
    locale: 'en'
  } as any)
})

describe('Login Page', () => {

    it('Renders Login in button', () => {
      render(<Login />)
  
      expect(screen.getByText('Login in')).toBeInTheDocument()
    })
  
    it('Should login a valid user', () => {
      const apiMocked = mocked(api.post)
  
      apiMocked.mockResolvedValueOnce({
        data: {
            user: {
                _id: 'fake-id'
            }
        }
      })
  
      const { getByText } = render(<Login />)
  
      const signInButton = getByText('Login in')
      fireEvent.click(signInButton)

      expect(apiMocked).toHaveBeenCalledWith('/user/login' , { email: "" })
      
    })

    it('Should not login a invalid user', () => {
        const apiMocked = mocked(api.post)

        apiMocked.mockResolvedValueOnce({
            // Without "_id" key on data
            data: {}
        })

        const { getByText } = render(<Login />)

        const signInButton = getByText('Login in')
        fireEvent.click(signInButton)

        expect(apiMocked).toHaveBeenCalledWith('/user/login' , { email: "" })
    })

    it('Should redirect user to dashboard when login in', async () => {
      const apiMocked = mocked(api.post)
      const response = {
        data: {
          user: {
            _id: "fake-id"
          }
        }
      };
      apiMocked.mockResolvedValue(response)

      const useRouterMocked = mocked(useRouter)
      const pushMocked = jest.fn()
  
      useRouterMocked.mockReturnValueOnce({
        push: pushMocked
      } as any)
      
      const { getByText } = render(<Login />)
  
      const signInButton = getByText('Login in')
      fireEvent.click(signInButton)
  
      await waitFor(() => {
        expect(pushMocked).toBeCalledWith('/dashboard')
      })
    })
  })