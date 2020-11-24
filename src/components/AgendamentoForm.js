import React, {useState} from "react";
import { Grid, TextField, InputLabel, MenuItem, Select, FormControl, withStyles, Button,  } from "@material-ui/core";
import {    DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from 'date-fns/locale'
import { connect } from "react-redux";
import * as actions from "../actions/agendamento";
import { withAlert } from 'react-alert'

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

const initialFieldValues = {
    placa: '',
    vaga: '',
    fornecedor: '',
    dataInicio: new Date(),
    dataFim: new Date()
}

const AgendamentoForm = ({alert , classes, ...props}) => {

    const [
        values,
        setValues
    ] = useState(initialFieldValues);

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    const handleDateInicioChange = date => { 
        setValues({
            ...values,
            dataInicio: date
        })
    }
    
    const handleDateFimChange = date => {
        setValues({
            ...values,
            dataFim: date
        }) 
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        props.createAgendamento(values, success, validationError);
    }
    const success = () => {
        
        alert.success("Inserido com sucesso!");
    }
    const validationError = err => {
        console.log(err);

        if (err.response){
            let data = err.response.data;
        
            if (data.errors !== undefined) { //business logic error
                data.errors.forEach(function(item){
                    alert.error(item.detail);
                });
            } else { //model error
                Object.keys(data).forEach(function(item){
                    alert.error(data[item]);
                });
            }
        }
        
    }

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container>
                    <h3>Agendar Recebimento de Carreta</h3>
                    <Grid container>
                        <Grid item xs={3}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                                <DateTimePicker
                                    ampm={false}
                                    disablePast
                                    value={values.dataInicio}
                                    name="dataInicio"
                                    onChange={handleDateInicioChange}
                                    label="Início"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                                <DateTimePicker
                                    ampm={false}
                                    disablePast
                                    value={values.dataFim}
                                    name="dataFim"
                                    onChange={handleDateFimChange}
                                    label="Final"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3}>
                            <TextField
                                name="placa"
                                label="Placa"
                                value={values.placa}
                                onChange={handleInputChange}
                                >
                            </TextField>
                        </Grid>
                        
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="vaga-select-label">Vaga</InputLabel>
                                <Select
                                    labelId="vaga-select-label"
                                    id="vaga-select"
                                    value={values.vaga}
                                    name="vaga"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="fornecedor-select-label">Fornecedor</InputLabel>
                            <Select
                                labelId="fornecedor-select-label"
                                id="fornecedor-select"
                                value={values.fornecedor}
                                name="fornecedor"
                                onChange={handleInputChange}
                            >
                                <MenuItem value={1}>Fornecedor de Peças</MenuItem>
                                <MenuItem value={2}>Fornecedor de Frutas</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Agendar
                            </Button>
                        </Grid>
                    </Grid>  
                </Grid>
        </form>
        );
}

const mapStateToProps = state => ({
    agendamentoList: state.agendamento.list
});

const mapActionToProps = {
    createAgendamento: actions.create
}

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(withAlert()(AgendamentoForm)));