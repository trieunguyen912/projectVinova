const apiURL = 'https://vibonus-dev-api.vinova.sg/'

export const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
        authorization: `Bearer ${token}`
    }
})