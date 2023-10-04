import axios from 'axios'

export const callEndpoint = (data) => {
  return axios.post('https://rickandmortyapi.com/api/character/2', data)
    .then(response => response.data)
}