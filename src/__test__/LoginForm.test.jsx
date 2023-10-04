/* eslint-disable no-undef */
import { render, cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../pages/Login/LoginForm'
import { LoginFormMock, LoginFormMockError } from '../_mocks_/LoginForm.mock'
import { act } from 'react-dom/test-utils'
import axios from 'axios'

jest.mock('axios')
jest.mock('../pages/Login/components/DisplayFormValues.jsx', () => ({
  __esModule: true,
    default: () => <div>Mocked DisplayFromValues</div>
}))

describe('LoginForm', () => {
  afterEach(cleanup)
  afterEach(jest.clearAllMocks)

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: LoginFormMock })
    render(<LoginForm />)
  })

  // it('should render correctly', () => {
  //   const container = render(<LoginForm />)
  //   expect(container).toBeTruthy()
  // })

  it('should be 2 inputs and a submit button on the screen', () => {
    const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i })
    const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i })
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()

    expect(usernameInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(submitButton).toBeDisabled()
  })

  it('should enable the submit button if the form values are valid', async () => {
    const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i })
    const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i })
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })

    await act(async () => {
      await userEvent.type(usernameInput, LoginFormMock.username)
      await userEvent.type(passwordInput, LoginFormMock.password)
    })


    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFormMock.username)
      expect(passwordInput).toHaveValue(LoginFormMock.password)
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('should disable the submit button if the form values are invalid', async () => {
    const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i })
    const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i })
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })

    await act(async () => {
      await userEvent.type(usernameInput, LoginFormMockError.username)
      await userEvent.type(passwordInput, LoginFormMockError.password)
    })

    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFormMockError.username)
      expect(passwordInput).toHaveValue(LoginFormMockError.password)
      expect(screen.getByText(/Username no puede tener mas de 12 caracteres/i)).toBeInTheDocument()
      expect(screen.getByText(/Password debe tener al menos una mayúscula, una minúscula, un número y un caracter especial/i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })
  })

  it('should call the onSubmit function when the submit button is clicked', async () => {
    const usernameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i })
    const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i })
    const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })

    await act(async () => {
      await userEvent.type(usernameInput, LoginFormMock.username)
      await userEvent.type(passwordInput, LoginFormMock.password)
    })

    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFormMock.username)
      expect(passwordInput).toHaveValue(LoginFormMock.password)
      expect(submitButton).not.toBeDisabled()
    })

    await act(async () => {
      await userEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1)
    })
  })

  it('should mock DisplayFromValues', () => {
    expect(screen.getByText('Mocked DisplayFromValues')).toBeInTheDocument()
  })
})