import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
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
    const [ jogos, setJogos ] = useState('');

    function loadData() { 
        api.get('/jogos').then((response) => { 
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

     function addJogos() { 
         const name = jogos;
         api.post('/jogos', { name: name }).then((response) => {
            setJogos('');
            setOpen(false);
            loadData();
        })
     }

     function markAsDone(id) { 
         api.patch(`/jogos/${id}/done`).then((response) => {
             loadData()
         })
     }

     function deleteJogos(id) {
         api.delete(`/jogos/${id}`).then((response) => { 
            loadData()
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                            <input type="checkbox" checked={item.done} onChange={() => markAsDone(item.id)}/>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" color="secondary" onClick={() => deleteJogos(item.id)}>Apagar</Button>
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
                    Digite o jogo que deseja adicionar.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Jogos"
                    type="email"
                    fullWidth
                    value={jogos}
                    onChange={e => setJogos(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button onClick={addJogos} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default App;