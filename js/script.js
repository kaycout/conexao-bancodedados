function atualizada(id,nome,email,usuario){

    if(confirm("Você deseja atualizar este cliente?")==1){
       document.getElementById("form").style.display="block";
        const form_nome = document.getElementById("txtnome");
        const form_email = document.getElementById("txtemail");
        const form_usuario = document.getElementById("txtusuario");
        const form_senha = document.getElementById("txtsenha");

        form_nome.value = nome;
        form_email.value = email;
        form_usuario.value = usuario;

        //ocultar o campo senha
        document.getElementById("txtsenha").style.display="none";

        //ocultar o botão cadastrar 
        document.getElementsByTagName("input")[4].style.display="none";

        //criar um botao para o formulario de atualizacao
        const btn_atualizar = document.createElement("button");

        //adicionar um texto ao botao
        btn_atualizar.innerHTML = "Atualizar"

        //adicionar um id ao nosso botao
        btn_atualizar.setAttribute("id","btn-atualizar");
        //adicionar um atributo de chamada de funcao
        btn_atualizar.setAttribute("onclick",`executar_atualizacao(${id})`)
        //adicionar o botao atualizar no formulario

        document.getElementById("form").appendChild(btn_atualizar);
  
    }
}

function executar_atualizacao(id){
    alert(id);
}

function excluir(id){

    if(confirm("Você deseja apagar este cliente?")==1){
        fetch(`http://127.0.0.1:3000/apagar/${id}`,{
            method:"DELETE",
            headers:{
                "accept":"application/json",
                "content-type":"application/json"
            }
        })

        .then((response)=>response.json())
        .then((dados)=>{
            alert(`Cliente apagado!`);
            //recarega a página, ou seja, atualiza a página.
           document.location.reload();
        })

        .catch((erro)=>console.error(erro))
    }
}

function carregar(){
    //vamos fazer uma referencia ao container que está 
    //na página e, assim manipularmos a div container 
    //pelo javascript
    const container = document.getElementById("container");
    //vamos requisitar a url do backend que lista os clientes cadastrados.
    //faremos o uso do comando fetch(busca) passando a url e dentro 
    //da estrutura do feach fazer a montagem da exibicao dos dados 
    //dos clientes.

    fetch("http://127.0.0.1:3000/listar")
    .then((res)=>res.json())
    .then((dados)=>{
        let saida = "";
        dados.msg.map((cli)=>{
            	saida+=`<div class="cliente">
                <p>Id:${cli.id}</p>
                <h2>Nome:${cli.nome}</h2>
                <h3>E-mail:${cli.email}</h3>
                <img src="img/atualizada.png" id="atualizada" onclick="atualizada(${cli.id},'${cli.nome}','${cli.email}','${cli.usuario}')">
                <img src="img/excluir.png" id="excluir" onclick="excluir(${cli.id})">
                </div>`
        })
        container.innerHTML = saida;

    })

}

function cadastrar(){
    const nome = document.getElementById("txtnome");
    const email = document.getElementById("txtemail");
    const usuario = document.getElementById("txtusuario");
    const senha = document.getElementById("txtsenha");

    //fetch será utilizado para fazer a requisicao da url de
    //cadastro e a passagem dos dados do cliente para cadastrar.
    //este fetch terá algumas configurações:
    //método de envio: METHOD=POST
    //cabeçalho de requisicacai: APLICATION/Json
    //Corpo de requisicao: onde você deve estruturar e 
    //enviar dados para cadastro

fetch("http://127.0.0.1:3000/cadastrar",{
            method:"POST",
            headers:{
            "accept":"application/json",
            "content-type":"application/json"
            },
            body:JSON.stringify({
            nome:nome.value,
            email:email.value,
            usuario:usuario.value,
            senha:senha.value
        })
    })
    .then((res)=>res.json())
    .then((dados)=>{
        alert(dados.msg);
        document.location.reload()
    })
    .catch((error)=>console.log(`Erro ao executar a api ${error}`))
}

const cad = document.getElementById("cadastro");
cad.onclick = ()=>{
    document.getElementById("form").style.display = "block";
}

const btnlogin = document.getElementById("login");
btnlogin.onclick = ()=>{
    document.getElementsByClassName("sombra")[0].style.top="0px";
}
