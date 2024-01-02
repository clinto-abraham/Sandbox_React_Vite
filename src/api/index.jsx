import axios, { isCancel, AxiosError } from 'axios';

const axiosInstanceCMS = axios.create({
    baseURL: 'http://localhost:5616/',
    headers: {
        'authorization': 'NjRlYzMyYTBlM2IzYjBmMTVhZDM1Yzhh'
    }
});


const axiosCMS = (action, params) =>
    axiosInstanceCMS.post('api/v4/apiai', {
        data: {
            "_action": action,
            "_param": params
        }
    })
        .then(function (response) {
            console.log(response, '.then');
            return response
        })
        .catch(function (error) {
            console.log(error, '.catch');
            return error
        })
        .finally(() => console.log('Executed completely'))

export default axiosCMS;