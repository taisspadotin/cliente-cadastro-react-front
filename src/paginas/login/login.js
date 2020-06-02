import React,{Component} from 'react';
import './style-login.scss';
import api from '../../api';
import { realizaLogin } from "../../services/auth";
import {Modal, Button} from 'react-bootstrap';

class Login extends Component{
	
	login = async () =>{
		const enviar = {
			email: this.state.emailValue,
			senha: this.state.senhaValue
		};
		if(enviar.email === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha o email', modal: true});
		}
		else if(enviar.senha === ''){
			this.setState({tituloModal:'Erro', corpoModal:'Preencha a senha', modal: true});
		}
		else{
			
			const resp = await api.post('/usuarios?login=1', enviar);
			//verificar se a pessoa logou
			if(resp.data.codigo === 1){
				//alert(resp.data.mensagem);
				realizaLogin(resp.data.token);
				window.location.href = "/";
			}
			else{
				this.setState({tituloModal:'Erro', corpoModal:resp.data.mensagem, modal: true});
			}
			
		}
		
	}
	state = {
		emailValue: '',
		senhaValue: '',
		modal: false,
		tituloModal: '',
		corpoModal: ''
	};
	
	inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 

    handleClose = () => {
		this.setState({modal: false});
	}

	render(){
		const {emailValue, senhaValue} = this.state;
		return(
			<>
				<div className="login">
					<div className="login-1"></div>
					<div className="login-2">
						<div className="login-content" align="center">	
							<h1>LOGIN</h1>
							<input className="input-login" type="text" onChange={this.inputChange} name='emailValue' value={emailValue} placeholder="Email"/>
							<input className="input-login" type="password" placeholder="Senha" onChange={this.inputChange} name="senhaValue" value={senhaValue}/>
							<br/>
							<button className="botao-login" type="button" onClick={()=>this.login()}>ENTRAR</button>
							<br/>
							<p>É novo? <a href="/usuario">cadastre-se </a></p>
							<br/>
						</div>	
						
					</div>
				</div>
				<Modal show={this.state.modal} onHide={()=>this.handleClose()}>
		        <Modal.Header closeButton>
		          <Modal.Title>{this.state.tituloModal}</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>{this.state.corpoModal}</Modal.Body>
		        <Modal.Footer>
		          <Button onClick={()=>this.handleClose()}>
		            Fechar
		          </Button>
		        </Modal.Footer>
		     </Modal>
			</>
		)
	}
}
export default Login;