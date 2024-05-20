import api from '../lib/axios'

export default {
    create(data){
        return api.post('/appointments', data)
    },
    getByDate(data){
        return api.get('/appointments?date=${date}', data)
    },
}