let nome;

let mnsgs;

function perguntarnome(){
    nome = prompt('Quem é você?');
    console.log('entrei')
}

function logar(){
let login = 
{ 
    name: nome
};

const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", login)
promise.then(buscarmsg)
promise.catch(alertadeerro)
}

function permanencia (){
    const login = {
        name: nome
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", login);
}
perguntarnome();
logar();
setInterval(permanencia,3000);
setInterval(buscarmsg, 3000);



function alertadeerro(error) {
    console.log(error.response.status);
    if (error.response.status === 404) {
      alert("Não encontrado");
      perguntarnome();
      logar();

    }
    if (error.response.status === 422) {
      alert("nome inválido!");
      perguntarnome();
      logar();
    }
    if (error.response.status === 409) {
      alert("Já existe alguém com esse nome!");
      perguntarnome();
      logar();

    }
  }
function buscarmsg(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa.then(atribuirmsg);
}
function atribuirmsg(resposta){
 mnsgs = resposta.data;
 console.log (mnsgs);
 exibirmnsgs();
}
function exibirmnsgs(){
    let mensagens = document.querySelector('.mensagens');
    mensagens.innerHTML= "";
    for (let i = 0; i < mnsgs.length; i++) {
      console.log(mnsgs[i].type)
        if (mnsgs[i].type === 'status'){
            mensagens.innerHTML += 
                `<div class="msg log" class="${[i]}">
                    <h1>(${mnsgs[i].time})</h1> <h2> ${mnsgs[i].from} </h2> <p>${mnsgs[i].text}</p>
                </div>`;
        }else if (mnsgs[i].type === 'message'){
            mensagens.innerHTML += 
                `<div class="msg public" class="${[i]}">
                    <h1>(${mnsgs[i].time})</h1> <h2>${mnsgs[i].from}</h2> <p> para </p> <h2>${mnsgs[i].to}:</h2> <p> ${mnsgs[i].text}</p>
                </div>`;
        }else if (mnsgs[i].type === 'private_message'){
            mensagens.innerHTML += 
                `<div class="msg private" class="${[i]}">
                    <h1>(${mnsgs[i].time})</h1> <h2>${mnsgs[i].from}</h2> <p> reservadamente para </p> <h2>${mnsgs[i].to}</h2> <p>${mnsgs[i].text}</p>
                </div>`;
        }
    }
    let ultimo = document.querySelector(".mensagens").lastElementChild
    ultimo.scrollIntoView();

}   
function enviarmsg(){
    const nova = document.querySelector(".enviar").value;

    const novamensagem = {
        from: nome,
        to: 'todos',
        text: nova,
        type: 'message'
    };
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novamensagem);

    promisse.then(buscarmsg)

}