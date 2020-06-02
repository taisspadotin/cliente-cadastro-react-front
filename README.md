# Cadastro de cliente 

### `Sobre o sistema`
O sistema foi feito utilizando ReactJS e a API foi feita em PHP

## Funcionamento do sistema
O sistema só pode ser acessado atravez do login, na tela de login onde a pessoa é redirecionada quando não está logada tem a opção de se cadastrar, onde a pessoa informa o nome de usuário, email e senha, depois de ser cadastrada estar realizando o login.
O sistema abre na tela principal e no menu tem a opção cadastro, onde está o formulario de cadastro.
O sistema realiza o cadastro de uma pessoa utilizando as informações do formulario na tela, ao clicar em um registro as informações são carregadas no formulario onde podem ser alteradas ou excluidas.
Apartir do momento que um cliente é selecionada ele só podera ser alterado ou deletado, para cadastrar um novo registro será necessário clicar em NOVO.
O cliente pode ter 1 ou N endereços, ou seja o primeiro endereço não poderá ser excluido, no card do endereço tem dois botões, um de mais que adiciona um novo endereço, e o de excluir, apartir do momento em que um novo endereço é adicionado é necessario preencher todos os campos exceto o complemento.

### `Para utilizar o sistema`

``` 
npm install
npm start
```

## Telas do sistema:
### Login
<img src="https://raw.githubusercontent.com/taisspadotin/cadastro-cliente-frontend/master/imagens/login.png">

### Home
<img src="https://raw.githubusercontent.com/taisspadotin/cadastro-cliente-frontend/master/imagens/home.png">

### Cadastro
<img src="https://raw.githubusercontent.com/taisspadotin/cadastro-cliente-frontend/master/imagens/cadastro1.png">
<img src="https://raw.githubusercontent.com/taisspadotin/cadastro-cliente-frontend/master/imagens/cadastro2.png">
