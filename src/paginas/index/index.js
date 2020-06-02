import React, {Component} from 'react';
import Navegacao from '../../components/navegacao/navegacao';
import './style.scss';
import {Row, Col} from 'react-bootstrap';
import {Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Index extends Component{
	render(){
		return(
		<>
		<div className="imagem-nav">
			<Navegacao fundo={'none'}/>
			<br/>
			<div className="conteudo-meio">
				<h1>Cadastros</h1> 
				<hr className="hr-inicio"/>
				<p>Site feito em React com back-end em PHP para cadastro de clientes.
				<br/>Tenha o maior controle sobre seus clientes e uma maior otimização ao armazenar dados.
				<br/><Link to="/cadastro"><button className="btn-index">Realize um cadastro <Icon name="arrow right"/></button></Link></p>

			</div>
		</div>	
		<div className='index2'>
			<Row align="center">
				<Col sm={3}>
					<h4>Mais sobre o projeto...</h4>
					
				</Col>
				<Col sm={9}>
					<p>
					Esse site tem como objetivo permitir o cadastro de clientes logados no sistema, para realizar o cadastro os usuários devem ter em mãos algumas informações como nome, rg, ... para descobrir mais você pode navegar até o menu em cadastro, onde é possível realizar o cadastro de uma nova pessoa.
					Para a estilização foi utilizado o SASS.
					<br/>Para saber um pouco mais sobre o funcionamento do sistema acesse o github e leia o README.md.
					</p>
				</Col>
			</Row>
		
		</div>
		</>
		)

	}
}
export default Index;