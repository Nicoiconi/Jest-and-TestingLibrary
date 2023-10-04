import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema } from "./schemas/login-form-schema"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import DisplayFormValues from "./components/DisplayFormValues"
import { callEndpoint } from "./services/call-endpoint"
import { Box } from '@mui/material'




export default function LoginForm() {
  const {
    register, // registra un input con alguna prop del form
    handleSubmit,
    watch,
    formState: {
      errors,
      isDirty, // si el formulario se ha tocado
      isValid
    },
    reset
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })

  const userNameWatch = watch('username')
  const passwordWatch = watch('password')

  const onSubmit = async data => {
    const result = await callEndpoint(data)
    console.log(result)
    reset()
  }

  return (
    <Box
      sx={{
        bgcolor: 'grey.300',
        borderRadius: '30px',
        p: '50px',
        width: '50%'
      }}
    >
      <FormProvider
        {...{ register, errors }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <CustomInput
              name='username'
              label='Nombre de usuario'
              required={true}
            />
            <CustomInput
              name='password'
              label='Contraseña'
              required={true}
            />
            <CustomButton
              isDirty={isDirty}
              isValid={isValid}
              type='submit'
            >
              Iniciar sesión
            </CustomButton>
          </Box>
        </form>
      </FormProvider>

      <DisplayFormValues
        isDirty={isDirty}
        isValid={isValid}
        values={{ username: userNameWatch, password: passwordWatch }}
      />
    </Box>
  )
}
