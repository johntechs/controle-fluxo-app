import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/agendamento";
import { Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, withStyles, Divider } from "@material-ui/core";
import AgendamentoForm from './AgendamentoForm';

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize:"1.1rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
});

const Agendamentos = ({classes, ...props}) => {
    
    useEffect(() => {
        props.fetchAllAgendamentos()
    },[])

    return ( 
        <Grid>
            <Paper className={classes.paper} elevation={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <AgendamentoForm />
                    <Divider/>
                    </Grid>   
                </Grid>
            </Paper>
            <Paper className={classes.paper} elevation={3}>
                <Grid container>
                    <h3>Listagem de agendamentos</h3>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Placa</TableCell>
                                        <TableCell>Data/Hora Agendamento</TableCell>
                                        <TableCell>Duração</TableCell>
                                        <TableCell>Nº Vaga</TableCell>
                                        <TableCell>Fornecedor</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.agendamentoList.map((record, index)=>{
                                            return (
                                                <TableRow key={index} hover>
                                                    <TableCell>{record.placaVeiculo}</TableCell>
                                                    <TableCell>{new Date(record.dataInicio).toLocaleString()}</TableCell>
                                                    <TableCell>{Math.abs(new Date(record.dataFim).getTime() - new Date(record.dataInicio).getTime())/60000} min</TableCell>
                                                    <TableCell>{record.vagaId}</TableCell>
                                                    <TableCell>{record.fornecedorNome}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                        
                </Grid>
            </Paper>
        </Grid>
        

        
    );
}

const mapStateToProps = state => ({
    agendamentoList: state.agendamento.list
});

const mapActionToProps = {
    fetchAllAgendamentos: actions.fetchAll
}
    
export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Agendamentos));