import { useFormContext } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'

const formValidation = (errors, errorKey) => {
  return errors[errorKey] ? <Typography color='red'>{errors[errorKey].message}</Typography> : ''
}

export default function CustomInput({ name = '', label = '', type = 'text', disabled = false, required = false }) {
  const { register, errors } = useFormContext()

  return (
    <div>
      <TextField
        required={required}
        disabled={disabled}
        type={type}
        error={errors && !!errors[name]} // !! verifica que sea truthy y lo convierte a booelano
        id={name}
        label={label}
        variant='outlined'
        {...register(name)}
        fullWidth
      />
      {
        errors && formValidation(errors, name)
      }
    </div>
  )
}
