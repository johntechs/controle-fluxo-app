import api from "./api";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    FETCH_ALL: 'FETCH_ALL'
}

const isNull = txt => (txt === null || txt === undefined || txt === '')

const formatData = data => ({
    ...data,
    vagaId: isNull(data.vaga) ? 0 : data.vaga,
    vaga: null,
    fornecedorId: isNull(data.fornecedor) ? 0 : data.fornecedor,
    fornecedor: null,
    placaVeiculo: data.placa
});

export const fetchAll = () => dispatch => {
    api.agendamento().fetchAll()
    .then(response => {
        dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data
        })
    })
    .catch(err => console.log(err))
}


export const create = (data, onSuccess, onError) => dispatch => {
    data = formatData(data)

    api.agendamento().create(data)
    .then(response => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: response.data
        })
        onSuccess()
    })
    .catch(err => onError(err))
}
