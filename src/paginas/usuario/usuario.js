import React, {Component} from 'react';
import {Col, Row,Modal} from 'react-bootstrap';
import { Button, Icon} from 'semantic-ui-react';
/*import * as Scroll from 'react-scroll';*/
import api from '../../api';


export default class Usuario extends Component{
	state = {
		registros: [],
		userValue: '',
		passwordValue: '',
		emailValue: '',
		type: "password",
		modal: false,
		tituloModal: '',
		corpoModal: '',
		reload: false,
		redir: 0
	};
	
	componentDidMount = async () => {
		
	}
	
	
	cadastrar = async () => {
		if(this.state.userValue === '')
		{
			this.setState({tituloModal:'Cadastro', corpoModal:"Preencha o usuário", modal: true});
		}
		else if(this.state.emailValue === ''){
			this.setState({tituloModal:'Cadastro', corpoModal:"Preencha o email", modal: true});
		}
		else if(this.state.passwordValue === ''){
			this.setState({tituloModal:'Cadastro', corpoModal:"Preencha a senha", modal: true});
		}
		else
		{
			const enviar = {
				usuario: this.state.userValue,
				email: this.state.emailValue,
				senha: this.state.passwordValue
			};
			
			const resp = await api.post('/usuarios', enviar);
			this.setState({tituloModal:'Cadastro', corpoModal:resp.data.mensagem, modal: true, redir:resp.data.codigo});
			
			

		}
	}
	
	
	inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 
    handleClose = () => {
		this.setState({modal: false});
		if(this.state.reload === true){
			document.location.reload();
		}
		if(this.state.redir === 1){
				window.location.href = "/login";
		}
	}
	
	visualizarSenha = () =>{
		this.setState({type: 'text'});
	}
	esconderSenha = () =>{
		this.setState({type: 'password'});
	}
  
	render(){
		const {userValue, emailValue, passwordValue} = this.state;
	    let icone = '';
	    if(this.state.type === "password")
	    {
	    	icone = <span onClick={()=>this.visualizarSenha()}><Icon name="eye"/></span>;
	    }
	    else{
	    	icone = <span onClick={()=>this.esconderSenha()}><Icon name="eye slash"/></span>;	
	    }
		
		return(
			<>
				<div className="conteudo-corpo">
				 <br/>
					<div className="geral">
						<br/>
							<div className="titulo">
									<h2>Cadastro de Usuários</h2>
							</div>
						
							<form className="form">
								<br/>
								
								<Row className="mb-3">
									<Col>
										<label>Usuário:</label>
										<input name='userValue' onChange={this.inputChange} value={userValue} placeholder="user name" type='text' />
									</Col>
								</Row>
								
								<Row className="mb-3">
									<Col>
										<label>Email:</label>
										<input name='emailValue' onChange={this.inputChange} value={emailValue} placeholder="example@mail.com" type='text' />
									</Col>
									<Col>
										<label>Senha:</label>
										<div class="form-group">
										   <input name='passwordValue' class="form-field" onChange={this.inputChange} value={passwordValue} placeholder="*********" type={this.state.type} />
										    {icone}
										</div>
									</Col>
									
								</Row>
								
								
								<br/>
								
								<Row align="center">
									<Col>
										<Button animated className="botao" type="button" onClick={()=>this.cadastrar()}>
										  <Button.Content visible>Cadastrar</Button.Content>
										  <Button.Content hidden>
											<Icon name='arrow right' />
										  </Button.Content>
										</Button>
										
									</Col>
								</Row>
								<br/>
								
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
							</form>
							
					 </div>
					<br/>
				</div>
			</>
		)
	}
}