const KEY_BD = '@usuariosestudo'

// este código é para administrar o cadastro
var listaRegistros = {
    ultimoIdGerado: 0,
    usuarios: []
}

/*Gravar os dados na memória do navegador:local storage. (isso deve ser feito 
depois de  estar a inserir sos dados na tabela) antes de colocar os botões de editar e excluir */

function gravarBD() {
 localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros) ) //este código traforma os dados em uma string e armazena.
}


function lerBD() {
const data = localStorage.getItem(KEY_BD)
if(data){
    listaRegistros = JSON.parse(data)
}
desenhar()
}


// função de inserir a linhas e colunas da tabela de forma automatizado!
function desenhar() {
    const tbody = document.getElementById('listaRetegistrosBody')
    if(tbody){
        tbody.innerHTML = listaRegistros.usuarios
        //função para colocar os nomes em ordem albfabetica
        .sort( (a, b)  => {
            return a.nome < b.nome ? -1: 1
        })
        .map( usuarios => {
            return `<tr>
                        <td>${usuarios.id}</td>
                         <td>${usuarios.nome}</td>
                         <td>${usuarios.fone}</td>
                         <td>
                         <button onclick='vizualizar("cadastro", false,${usuarios.id})' >Editar</button>
                          <button class='vermelho' onclick='perguntarSeDeleta(${usuarios.id})'>Excluir</button>
                         </td>
                         
                </tr>`
        }).join('')
    }
}

// função para inserir id e os dados  na listaRegistro
function insertUsuario(nome, fone) {
const id = listaRegistros.ultimoIdGerado + 1;
listaRegistros.ultimoIdGerado = id;
    listaRegistros.usuarios.push({
        id, nome, fone
    })
    gravarBD() //isto vai gravar cada pessoa que ser cadastrado
    desenhar() //este codigo vai colocar dados na tabela 
    vizualizar('lista') // este codigo vai fazer com que os dados sejam visivel na tabela ou na lista 
}


// Função Editar dados na listaRegistro 
function EditUsuario(id, nome, fone) {
  var usuario = listaRegistros.usuarios.find(usuario => usuario.id == id)
    usuario.nome = nome;
    usuario.fone = fone;
    gravarBD()
    desenhar()
    vizualizar('lista')

}

// função delete para apagar dados na listaRegistro
function deleteUsuario(id) {
    listaRegistros.usuarios = listaRegistros.usuarios.filter(usuario => {
        return usuario.id != id
    })
    gravarBD()
    desenhar()
}


// Perguntar se quer deletar dados e deletar registro
function perguntarSeDeleta(id){
    if(confirm(`Quer Excluir registro de id` + id)){
        deleteUsuario(id) 
        desenhar()  
    }
}

//função para limpar os input quando este terminar de fazer um novo cadastro

function limparEdicao(){
    document.getElementById('nome').value = ''
    document.getElementById('fone').value = ''
}

//código de visualização da página reactiva (este deve ser o primeiro códigos a serem desenvolvido)
function vizualizar(pagina, novo=false, id=null) {
    document.body.setAttribute('page',pagina);

    // colocar focus no input nome sempre que a página cadastro for activo
    if (pagina === 'cadastro') {
        //funçaõ de editar o cadastro e limpar os inputs do formulario 
        if(novo) limparEdicao()
            const usuario = listaRegistros.usuarios.find(usuario => usuario.id == id)
        if(usuario){
            document.getElementById('id').value = usuario.id
            document.getElementById('nome').value = usuario.nome  
            document.getElementById('fone').value = usuario.fone
        }
        document.getElementById('nome').focus();
    }
}

// função para enviar os dados do formulario  na listaRegistro

function submeter(e) {
e.preventDefault()
const data =  {
        id: document.getElementById('id').value, 
        nome: document.getElementById('nome').value,
        fone: document.getElementById('fone').value
    }
    /* Este codigo faz uma verificação se ja existe um id 
    caso existier o id, então que se faça edição, caso não, então faz inserçãos de novo cadastro */
    if(data.id){
        EditUsuario(data.id, data.nome, data.fone)

    } else{
        insertUsuario(data.nome, data.fone)

    }
   
}


//activação do desenho  da tabelas
window.addEventListener('load', () => {
    //desenhar() estes código so anulou-se porque agora deve funcionar o codigo lerBD, que ajuda no armazenamento de dados
     lerBD()
    // activação do formulário 
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})