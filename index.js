//importar a biblioteca do node modules chamada Express para
//criar nosso servidor de backend
const express = require("express"); //ponto e vírgula é opcional

//importar a biblioteca do mysql
const mysql = require("mysql2");

// estabelecer conexao com o banco de dados mysql
const con = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"",
    database:"mydb"

});

//Carregar e instanciar o express para utilizar as rotas:
//GET -> Para obter dados do banco de dados -> R
//POST -> Para enviar dados ao servidor e gravar dados no banco -> C
//PUT -> Para atualizar os dados no banco -> U
//DELETE -> Para apagar dados em banco -> D

const app = express();

//Carregar a função que manipula dados em formato JSON, ou seja, permite
//ler, gravar, atualizar, deletar, enviar e receber dados em formato JSON

app.use(express.json());

// Primeira rota para listar os dados do banco:
app.get("/listar",(req,res)=>{
    // usar o comando select para para listar todos os clientes
    con.query("Select * from cliente", (error,result)=>{
        if(error){
            return res.status(500)
            .send({erro:`Erro ao tentar listar os dados ${error}`});
        }
        res.status(200).send({msg:result});
    })
});

// Segunda rota para receber os dados enviados pelo usuário:
app.post("/cadastrar", (req,res)=>{
    con.query("insert into cliente set ?",req.body,(error, result)=>{
        if(error){
            return res.status(500).send({erro:`Erro ao tentar cadastrar ${error}`});
        }

        res.status(201).send({msg:`Cliente cadastrado`,playload:result}); // status code (201, por exemplo)
    })

    
});

// Terceira rota para receber os dados e atualizar:
app.put("/atualizar/:id",(req,res)=>{
    
    con.query("update cliente set ? where id=?",[req.body, req.params.id],(error,result)=>{
        if(error){
            return res.status(500).send({erro:`Erro ao tentar atualizar ${error}`})
        }
        res.status(200).send({msg:'Dados para atualizar',id:req.params.id}) //pela url 
        })
    });

// Quarta rota para receber um id e apagar um dados
app.delete("/apagar/:id",(req,res)=>{
    con.query("delete from cliente set ? where id=?",req.params.id,(error,result)=>{
        if(error){
            return res.status(500).send({erro:`Cliente deletado ${error}`})
        }
        res.status(204).send({msg:'Dados deletados',id:req.params.id}) //pela url 
        })
    });

app.listen(3000,
    ()=>console.log("Servidor Online https://127.0.0.1:3000"))