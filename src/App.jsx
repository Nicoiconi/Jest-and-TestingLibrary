import './App.css'

import { Box, Typography } from '@mui/material'
// import { LoginForm } from './pages'

function App() {

  return (
    <Box
      className='App'
      display='flex'
      justifyContent='center'
      flexDirection='column'
    >
      <Typography
        variant='h2'
        mb='20px'
        textAlign='center'
      >
        Testing
      </Typography>
      {/* <LoginForm /> */}
    </Box>
  )
}

export default App
