let participantes = [
  {
    nome: "João Silva",
    email: "joao@example.com",
    dataInscricao: new Date(2024, 5, 10, 10, 30),
    dataCheckIn: new Date(2024, 5, 25, 12, 45)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@example.com",
    dataInscricao: new Date(2024, 5, 11, 9, 15),
    dataCheckIn: new Date(2024, 5, 26, 14, 20)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@example.com",
    dataInscricao: new Date(2024, 5, 12, 11, 20),
    dataCheckIn: new Date(2024, 5, 27, 9, 30)
  },
  {
    nome: "Ana Lima",
    email: "ana@example.com",
    dataInscricao: new Date(2024, 5, 13, 14, 45),
    dataCheckIn: new Date(2024, 5, 28, 8, 55)
  },
  {
    nome: "Lucas Pereira",
    email: "lucas@example.com",
    dataInscricao: new Date(2024, 5, 14, 8, 10),
    dataCheckIn: new Date(2024, 5, 29, 11, 40)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@example.com",
    dataInscricao: new Date(2024, 5, 15, 12, 30),
    dataCheckIn: new Date(2024, 5, 30, 13, 15)
  },
  {
    nome: "Carlos Fernandes",
    email: "carlos@example.com",
    dataInscricao: new Date(2024, 5, 16, 9, 55),
    dataCheckIn: new Date(2024, 6, 1, 10, 25)
  },
  {
    nome: "Juliana Almeida",
    email: "juliana@example.com",
    dataInscricao: new Date(2024, 5, 17, 15, 20),
    dataCheckIn: new Date(2024, 6, 2, 15, 50)
  },
  {
    nome: "Rafael Oliveira",
    email: "rafael@example.com",
    dataInscricao: new Date(2024, 5, 18, 10, 45),
    dataCheckIn: new Date(2024, 6, 3, 9, 10)
  },
  {
    nome: "Fernanda Santos",
    email: "fernanda@example.com",
    dataInscricao: new Date(2024, 5, 19, 13, 25),
    dataCheckIn: new Date(2024, 6, 4, 11, 35)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)">
    Confirmar check-in
    </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
       ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atuslizarLista = (participantes)  => {
  let output = ""
  //estrutura de repetição
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  //substituir informação do HTML
  document.querySelector('tbody').innerHTML = output
}

atuslizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]

  atuslizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value= ""
} 

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  //encontrar o participante na lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participantes
  atuslizarLista(participantes)
}