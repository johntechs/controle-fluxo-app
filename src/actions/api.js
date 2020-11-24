import axios from "axios";

const baseUrl = "http://localhost:50205/api/"

export default {
    agendamento(url = baseUrl + 'agendamento/' ) {
        return {
            fetchAll : async () => await axios.get(url),
            create : async newRecord => {
                return await axios.post(url, newRecord)
            }
        }
    },
    
}