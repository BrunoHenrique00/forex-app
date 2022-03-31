import { fireEvent, render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Login from '../pages/login'
import { api } from '../services/api'

jest.mock('../services/api')

describe('Login Page', () => {

    it('Renders Login in button', () => {
      render(<Login />)
  
      expect(screen.getByText('Login in')).toBeInTheDocument()
    })
  
    it('Should login a valid user', () => {
      const apiMocked = mocked(api.post)
      const localStorageMocked = mocked(window.localStorage.setItem)
  
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
      expect(localStorageMocked).toHaveBeenCalledWith('userId' , 'fake-id')
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
  })