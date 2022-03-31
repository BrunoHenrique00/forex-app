import { fireEvent, render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Home from '../pages/index'
import { useRouter } from 'next/router'
import { api } from '../services/api'
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from './test-utils/createMockRouter'

jest.mock('next/router')
jest.mock('../services/api')

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

  // it('Should redirect a new user to dashboard', () => {
  //   const apiMocked = mocked(api.post)
  //   apiMocked.mockResolvedValueOnce({
  //     data: {
  //       _id: 'fake-id'
  //     }
  //   })

  //   const router = createMockRouter({})
    
  //   const { getByText } = render(
  //     <RouterContext.Provider value={router}>
  //       <Home />
  //     </RouterContext.Provider>
  //   )
  //   const signInButton = getByText('Sign in')
  //   fireEvent.click(signInButton)

  //   expect(router.push).toBeCalled()
  // })
})