import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import Moment from 'moment' //Utilizado para melhor represtar datas dentro do JavaScript
import { 
    Container, 
    Table,
    TableHead, 
    TableRow, 
    TableCell, 
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {

    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ updateModalOpen, setUpdateModalOpen ] = useState(false);
    const [ currentID, setCurrentID ] = useState(''); 
    const [ jogo, setJogo ] = useState('');
    const [ categoria, setCategoria] = useState('');
    const [ desenvolvedora, setDesenvolvedora] = useState('');
    const [ dataLancamento, setDataLancamento] = useState('');

    function loadData() { 
        api.get('/jogos').then((response) => { 
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

     function openUpdateModal(item) {
         setUpdateModalOpen(true);
         setCurrentID(item.id);
         setJogo(item.nome);
         setCategoria(item.categoria);
         setDesenvolvedora(item.desenvolvedora);
         setDataLancamento(item.data_lancamento);
     }
    const closeUpdateModal = () => setUpdateModalOpen(false);

     function addJogo() { 
         const name = jogo;
         const category = categoria;
         const dev = desenvolvedora;
         const releaseDate = dataLancamento;
         api.post('/jogos', { nome: name, categoria: category, desenvolvedora: dev, dataLancamento: releaseDate}).then((response) => {
             setJogo('');
             setCategoria('');
             setDesenvolvedora('');
             setDataLancamento('');
            setOpen(false);
            loadData();
        })
     }

     function deleteJogo(id) {
         api.delete(`/jogos/${id}`).then((response) => { 
            loadData()
         })
     }

     function updateJogo() {
        const updateID = currentID;
        const name = jogo;
        const category = categoria;
        const dev = desenvolvedora;
        const releaseDate = dataLancamento;
         api.put(`/jogos/${updateID}`, {id: updateID, nome: name, categoria: category, desenvolvedora: dev, dataLancamento: releaseDate}).then((response) => {
            setJogo('');
            setCategoria('');
            setDesenvolvedora('');
            setDataLancamento('');
            setUpdateModalOpen(false);
            loadData();
         })
     }

    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container"> 
            <Table>
                {lista.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.categoria}</TableCell>
                        <TableCell>{item.desenvolvedora}</TableCell>
                        <TableCell>{Moment.utc(item.data_lancamento).format('Do MMM YYYY')}</TableCell>
                        <TableCell padding="none">
                            <Button variant="outlined" size="small" color="primary" onClick={() => openUpdateModal(item)}>Modificar</Button> 
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" color="secondary" onClick={() => deleteJogo(item.id)}>Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
        </Container>
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Novo Jogo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite as informações do jogo que deseja adicionar.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Jogo"
                    type="text"
                    fullWidth
                    value={jogo}
                    onChange={e => setJogo(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="categoria"
                    label="Categoria"
                    type="text"
                    fullWidth
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="desenvolvedora"
                    label="Desenvolvedora"
                    type="text"
                    fullWidth
                    value={desenvolvedora}
                    onChange={e => setDesenvolvedora(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="dataLancamento"
                    label=""
                    type="date"
                    fullWidth
                    value={dataLancamento}
                    onChange={e => setDataLancamento(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button onClick={addJogo} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={updateModalOpen} onClose={closeUpdateModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Editar o Jogo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Atualize as informações abaixo.
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="updateID"
                    label="ID do Jogo"
                    type="text"
                    fullWidth
                    value={currentID}
                >
                </TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Jogo"
                    type="text"
                    fullWidth
                    value={jogo}
                    onChange={e => setJogo(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="categoria"
                    label="Categoria"
                    type="text"
                    fullWidth
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="desenvolvedora"
                    label="Desenvolvedora"
                    type="text"
                    fullWidth
                    value={desenvolvedora}
                    onChange={e => setDesenvolvedora(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="dataLancamento"
                    label=""
                    type="date"
                    fullWidth
                    value={dataLancamento}
                    onChange={e => setDataLancamento(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUpdateModal} color="primary">
                    Cancelar
                </Button>
                <Button onClick={updateJogo} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default App;
