import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import { Button, Table, Message, Popup, Pagination, Icon} from 'semantic-ui-react';
import * as Scroll from 'react-scroll';
import './style.scss';
import {Col, Row, Modal, Card} from 'react-bootstrap';
import api from '../../api';
import InputMask from 'react-input-mask';
import { getToken } from "../../services/auth";

export default class Cadastro extends Component{
	constructor(props){
		super(props);
		
		//refs
		this.refNome  = React.createRef();
		this.refTelefone = React.createRef();
		this.refNascimento = React.createRef();
		this.refRg = React.createRef();
		this.refCpf = React.createRef();

		//refs dinamicos para endereço
		/*this.logradouro = [];
		this.refLogradouro = element =>{
			this.logradouro.push(element);
		}
		this.cep = [];
		this.refCep = element =>{
			this.cep.push(element);
		}
		this.bairro = [];
		this.refBairro = element =>{
			this.bairro.push(element);
		}
		this.cidade = [];
		this.refCidade = element =>{
			this.cidade.push(element);
		}
		this.estado = [];
		this.refEstado = element =>{
			this.estado.push(element);
		}
		this.complemento = [];
		this.refComplemento = element =>{
			this.complemento.push(element);
		}
		this.numero = [];
		this.refNumero = element =>{
			this.numero.push(element);
		}
		this.card = [];
		this.refCard = element =>{
			this.card.push(element);
		}*/
	}
	
	state = {
		nomeValue: '',
		telefoneValue: '',
		nascimentoValue: '',
		registros: [],
		paginas: 0,
		pagina_atual: 1,
		idSelecionado: '',
		modal: false,
		tituloModal: '',
		corpoModal: '',
		reload: false,
		rgValue: '',
		cpfValue: '',
		qtdEndereco: 1,
		valores: [],
		enderecos: [{
			logradouro: '',
			numero: '',
			bairro: '',
			cidade: '',
			cep: '',
			complemento: '',
			estado: '',
			id_endereco: ''

		}]
	}  
	
	componentDidMount = async() => {
		const resp = await api.get('/pessoas?page=0&limit=5',{
					headers:{
						Authorization: getToken(),
					},
				});
		let d = (resp.data.pessoas);
		this.setState({paginas: resp.data.total_paginas});
		const registros = [];
		//console.log(resp.data);
		d.map((row)=>{
				registros.push({
					id_pessoa: row.id_pessoa,
					nome: row.nome,
					telefone: row.telefone,
					nascimento: row.nascimento,
					rg: row.rg,
					cpf: row.cpf
				})
		});
			
		this.setState({registros: registros})
		
	}
	
	selecionaRegistro = async (id) =>{
		this.setState({idSelecionado: id});
		let scroll     = Scroll.animateScroll;
		scroll.scrollToTop();
		
		const resp = await api.get(`/pessoas?id=${id}`,{
					headers:{
						Authorization: getToken(),
					},
				});
		let d = (resp.data.pessoa);
		let endereco = resp.data.enderecos;
		let qtdEndereco = (endereco.length);

		this.setState({
			nomeValue: d.nome, 
			telefoneValue: d.telefone, 
			nascimentoValue: d.nascimento,
			cpfValue: d.cpf,
			rgValue: d.rg,
			qtdEndereco,
			enderecos: endereco
			});
		

	}

	verificar = () =>{
		const {nomeValue, telefoneValue, nascimentoValue, rgValue, cpfValue, enderecos} = this.state;
		if(nomeValue === '')
		{
			this.refNome.current.focus();
			this.setState({tituloModal:'Erro de cadastro', corpoModal:'Preencha o nome!', modal: true});
			return false;			
		}
		else if(rgValue === '')
		{
			this.setState({tituloModal:'Erro de cadastro', corpoModal:'Preencha o RG!', modal: true});
			return false;			
		}
		else if(cpfValue === '')
		{
			this.setState({tituloModal:'Erro de cadastro', corpoModal:'Preencha o CPF!', modal: true});
			return false;			
		}
		else if(telefoneValue === '')
		{
			this.setState({tituloModal:'Erro de cadastro', corpoModal:'Preencha o Telefone!', modal: true});
			return false;			
		}
		else if(nascimentoValue === '')
		{
			this.setState({tituloModal:'Erro de cadastro', corpoModal:'Preencha a data de nascimento!', modal: true});
			return false;			
		}
		else{
			for(let i=0; i<enderecos.length; i++){
			if(enderecos[i].cep === ''){
				let msg = "Preencha o CEP do endereço "+(i+1);
				this.setState({tituloModal:'Erro de cadastro', corpoModal:msg, modal: true});
				return false;					
			}
			else if(enderecos[i].logradouro === ''){
				let msg = "Preencha o logradouro do endereço "+(i+1);
				this.setState({tituloModal:'Erro de cadastro', corpoModal:msg, modal: true});
				return false;					
			}
			else if(enderecos[i].numero === ''){
				let msg = "Preencha o numero do endereço "+(i+1);
				this.setState({tituloModal:'Erro de cadastro', corpoModal:msg, modal: true});
				return false;					
			}
			else if(enderecos[i].bairro === ''){
				let msg = "Preencha o bairro do endereço "+(i+1);
				this.setState({tituloModal:'Erro de cadastro', corpoModal:msg, modal: true});
				return false;					
			}
			else if(enderecos[i].cidade === ''){
				let msg = "Preencha o cidade do endereço "+(i+1);
				this.setState({tituloModal:'Erro de cadastro', corpoModal:msg, modal: true});
				return false;					
			}
			else if(enderecos[i].estado === ''){
				let msg = "Preencha o estado do endereço "+(i+1);
				this.setState({tituloModal:'Erro de cadastro', corpoModal:msg, modal: true});
				return false;					
			}
			
		}
			return true;
		}
		
	}
	
	cadastrar = async () => {
		if(this.state.idSelecionado !== '')
		{
			this.setState({tituloModal:'Erro de cadastro', corpoModal:'Esse registro já existe no banco!', modal: true});

		}
		else
		{
			const {nomeValue, telefoneValue, nascimentoValue, rgValue, cpfValue, enderecos} = this.state;
			if(this.verificar() === true)
			{
				let enviar = { nome: nomeValue, telefone:telefoneValue, cpf: cpfValue, rg:rgValue, nascimento:nascimentoValue, enderecos};
				const resp = await api.post(`/pessoas`, enviar,{
					headers:{
						Authorization: getToken(),
					},
				});
				this.setState({tituloModal:'Cadastro', corpoModal:resp.data.mensagem, modal: true, reload: true});
				
			}
		}
	}
  
    inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })

    } 
	
	handlePaginationChange = async (e, { activePage }) => {
		let pagina = (activePage - 1);
		this.setState({pagina_atual: activePage});
		
		const resp = await api.get(`/pessoas?page=${pagina}&limit=5`,{
					headers:{
						Authorization: getToken(),
					},
				});
		let d = (resp.data.pessoas);
		this.setState({registros: d})
		
	}
	
	alterar = async () => {
		if(this.state.idSelecionado === '')
		{
			this.setState({tituloModal:'Erro de cadastro', corpoModal:'Selecione um registro!', modal: true});
		}
		else
		{
			if(this.verificar() === true)
			{
				const id = this.state.idSelecionado;
				const {nomeValue, telefoneValue, nascimentoValue, rgValue, cpfValue, enderecos} = this.state;
				let enviar = {nome: nomeValue, telefone:telefoneValue, nascimento:nascimentoValue, rg:rgValue, cpf:cpfValue, enderecos:enderecos};
				const resp = await api.patch(`/pessoas?id=${id}`, enviar,{
					headers:{
						Authorization: getToken(),
					},
				});
				this.setState({tituloModal:'Alteração de dados', corpoModal:resp.data.mensagem, modal: true, reload: true});
				//console.log(enderecos);
			}
        }
	}
	
	deletar = async () => {
		if(this.state.idSelecionado === '')
		{
			this.setState({tituloModal:'Erro', corpoModal:'Favor selecionar um registro!', modal: true});
		}
		else
		{
			const id = this.state.idSelecionado;
			const resp = await api.delete(`/pessoas?id=${id}`,{
					headers:{
						Authorization: getToken(),
					},
				});
			this.setState({tituloModal:'Cadastro', corpoModal:resp.data.mensagem, modal: true, reload: true});
		}
	}
	
	novo = () => {document.location.reload();}

	handleClose = () => {
		this.setState({modal: false});
		if(this.state.reload === true){
			document.location.reload();
		}
	}
	novoEndereco = () => {
		
		let addr = {
	        id_endereco: null,
	        logradouro: "",
	        numero: "",
	        bairro: "",
	        cidade: "",
	        estado: "",
	        complemento: "",
	        cep: ""
	    };
	    let enderecos = this.state.enderecos;
	    enderecos.push(addr);

		this.setState({enderecos});
  	}
	
	removerAddr = (i) => {
		this.state.enderecos.splice(i, 1);
    	this.setState([...this.state.enderecos]);
		
	}

	handleAddr = async(i, event) =>{
		const { name, value } = event.target;
		let a = [...this.state.enderecos];
		a[i] = { ...a[i], [name]: value };
		 
		this.setState({...this.state.enderecos,enderecos:a});
	}

	render(){
		const { nomeValue, telefoneValue, nascimentoValue, rgValue, cpfValue} = this.state;   
		
		let paginas = (this.state.paginas);
		let registroBanco = '';
		if(this.state.registros.length === 0)
		{
			registroBanco = 
			<Message negative style={{textAlign:'center'}}>
				<Message.Header>Nenhum registro encontrado!</Message.Header>
				<p>Verifique sua conexão com o banco</p>
			</Message>;
		}
		else
		{
			registroBanco = 
			<div>
				<Table celled fixed singleLine className="tabela">
					<Table.Header>
					  <Table.Row>
						<Table.HeaderCell>Nome</Table.HeaderCell>
						<Table.HeaderCell>CPF</Table.HeaderCell>
						<Table.HeaderCell>Telefone</Table.HeaderCell>
					  </Table.Row>
					</Table.Header>
				<Table.Body>
					{this.state.registros.map((row)=>
					  <Table.Row key={row.id_pessoa} onClick={()=>this.selecionaRegistro(row.id_pessoa)} style={{background: row.id_pessoa === this.state.idSelecionado && '#76002c30'}}>
						<Table.Cell>{row.nome}</Table.Cell>
						<Table.Cell>{row.cpf}</Table.Cell>
						<Table.Cell>{row.telefone}</Table.Cell>
					  </Table.Row>
					)}
				</Table.Body>
			  </Table>
			  <br/>
				
			  <Pagination className="paginacao" boundaryRange={0} ellipsisItem={null} firstItem={null} lastItem={null}	activePage ={this.state.pagina_atual}
						  siblingRange={1} totalPages={paginas} onPageChange={this.handlePaginationChange}/>
						  
			</div>;
		}
		
		return(
		<>
			<div className="conteudo-corpo">
			<Navegacao fundo={'none'}/>
			<br/>
			
			<div className="geral">
				<div className="titulo">
					<h2>Cadastro de clientes</h2>
				</div>
				
			   <form className="form">
				 <br/>
				 
					<Row className="mb-3">
						<Col>
							<label>Nome *</label>
							<input onChange={this.inputChange} name='nomeValue' ref={this.refNome} type='text' value={nomeValue}/>
						</Col>
					</Row>
										
					<Row className="mb-3">
						<Col>
							<label>RG *</label>
							<InputMask mask="99.999.999-9" onChange={this.inputChange} name='rgValue' value={rgValue}>
    							{(inputProps) => <input type="text" ref={this.refRg} onChange={this.inputChange} name='rgValue' value={rgValue} />}
    						</InputMask>	
						</Col>
						<Col>
							<label>CPF *</label>
							<InputMask mask="999.999.999-99" onChange={this.inputChange} name='cpfValue' value={cpfValue} >
    							{(inputProps) => <input type="text" ref={this.refCpf} onChange={this.inputChange} name='cpfValue' value={cpfValue} />}
    						</InputMask>	
						</Col>
					</Row>

					<Row className="mb-3">
						<Col sm>
							<label>Telefone *</label>
							<InputMask mask="(99) 99999-9999" value={telefoneValue} onChange={this.inputChange} name='telefoneValue' >
    							{(inputProps) => <input value={telefoneValue}  ref={this.refTelefone} onChange={this.inputChange} name='telefoneValue'/>}
  							</InputMask>
						</Col>
						<Col sm>
							<label>Nascimento *</label>
							<InputMask mask="99/99/9999" value={nascimentoValue} onChange={this.inputChange} name='nascimentoValue'>
    							{(inputProps) => <input ref={this.refNascimento} value={nascimentoValue} onChange={this.inputChange} name='nascimentoValue' />}
    						</InputMask>
						</Col>
					</Row>

					<Row className="mb-3">
						<Col>
							{this.state.enderecos.map((enderecos, i) => (
					          <Card key={i} className="card">
							  <Card.Header>
							  	<Row>
							  		<Col>Endereço {i+1}</Col>
							  		<Col><Icon style={{float: 'inline-end', color: 'green', marginLeft: '10px'}} name='add' onClick={()=>this.novoEndereco()}/>
							  		{i !== 0 && <Icon name='trash' className="icon-addr" style={{float: 'inline-end', color: 'red'}} onClick={()=>this.removerAddr(i)}/>}</Col>
							  	</Row>
							  </Card.Header>
							  <Card.Body>
							      <Row>
							      	<Col md="4">
							      		<label>CEP *</label>
			    						<input type="text" onChange={(e) => this.handleAddr(i, e)} id={"cep_"+i} maxLength="8" name='cep' value={enderecos.cep}/>
			    					</Col>
							        <Col md="8">
							      		<label>Logradouro *</label>
							      		<input type="text" id={"logradouro_"+i} name="logradouro" onChange={(e) => this.handleAddr(i, e)} value={enderecos.logradouro}/>
							      	</Col>
							      </Row>
							      <Row className="mt-3">
							      	<Col md="2">
							      		<label>Numero *</label>
							      		<input type="text" name="numero" maxLength="4" id={"numero_"+i} onChange={(e) => this.handleAddr(i, e)} value={enderecos.numero}/>
							      	</Col>
							      	<Col md="5">
							      		<label>Bairro *</label>
							      		<input type="text" name="bairro" onChange={(e) => this.handleAddr(i, e)} id={"bairro_"+i} value={enderecos.bairro}/>
							      	</Col>
							      	<Col md="5">
							      		<label>Cidade *</label>
							      		<input type="text" name="cidade" onChange={(e) => this.handleAddr(i, e)} id={"cidade_"+i} value={enderecos.cidade}/>
							      	</Col>
							      </Row>

							      <Row className="mt-3">
							      	<Col md="2">
							      		<label>Estado *</label>
							      		<input type="text" name="estado"  value={enderecos.estado} maxLength="2" id={"estado_"+i} onChange={(e) => this.handleAddr(i, e)}/>
							      	</Col>
							      	<Col>
							      		<label>Complemento</label>
							      		<input type="text" name="complemento"  value={enderecos.complemento} id={"complemento_"+i} onChange={(e) => this.handleAddr(i, e)}/>
							      	</Col>
							      </Row>
							  </Card.Body>
							</Card>
			          ))}

						</Col>
					</Row>
					
					<br/>
					<Row align="center">
						<Col>
						<Button animated className="botao" type="button" onClick={() =>this.novo()}>
						  <Button.Content visible>Novo</Button.Content>
						  <Button.Content hidden>
							<Icon name='add' />
						  </Button.Content>
						</Button>
						
						<Button animated className="botao" type="button" onClick={() => this.cadastrar()}>
						  <Button.Content visible>Cadastrar</Button.Content>
						  <Button.Content hidden>
							<Icon name='arrow right' />
						  </Button.Content>
						</Button>
						
						<Button animated className="botao" type="button" onClick={()=>this.alterar()}>
						  <Button.Content visible>Alterar</Button.Content>
						  <Button.Content hidden>
							<Icon name='pencil' />
						  </Button.Content>
						</Button>
						
						 <Popup content='Deletar registro' trigger={
							 <Button animated className="botao" type="button" onClick={()=>this.deletar()}>
							  <Button.Content visible>Deletar</Button.Content>
							  <Button.Content hidden>
								<Icon name='trash alternate' />
							  </Button.Content>
							</Button>
							 
						 }/>
						</Col>	
					</Row>
					<br/>
					
				    {registroBanco}
					
			     </form>
			 </div>

			 <Modal show={this.state.modal} onHide={()=>this.handleClose()}>
		        <Modal.Header closeButton>
		          <Modal.Title>{this.state.tituloModal}</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>{this.state.corpoModal}</Modal.Body>
		        <Modal.Footer>
		          <Button secondary onClick={()=>this.handleClose()}>
		            Fechar
		          </Button>
		        </Modal.Footer>
		     </Modal>

			<br/>
			</div>
		</>	
		)
	}
}