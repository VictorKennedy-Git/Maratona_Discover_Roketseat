const Modal = {
	open() {
		document.querySelector('.modal-overlay').classList.add('active')
	},

	close() {
		//toogle == função de modal"liga e desliga"
		//fechar modal
		//remover a classe active do modal
		document.querySelector('.modal-overlay').classList.remove('active')
	}
}

const Transaction = {
	all: [
		{
			id: 1,
			description: 'Site',
			date: "09/10/2002",
			amaout: 70000, //amaout é mais usado para dinheiro
			//isso é 500 mas as casas decimais são formatadas com currency
		},
		{
			id: 1,
			description: 'água',
			date: "09/10/2002",
			amaout: -8000,
		},
		{

			id: 1,
			description: 'pão',
			date: "09/10/2002",
			amaout: -20000,
		}
	], //array vai receber uma lista de objetos//atalho para todas as transações
	//refatoração

	add(transactions) {
		Transaction.all.push(transactions)
		// console.log(Transaction.all)
		App.reload()
	},

	remove(index) {
		Transaction.all.splice(index, 1)//pega a posição do array, começa e 0
		//a partir do elemento tal e o total
		App.reload()
	},

	incomes() {
		let income = 0
		//pegar todas as transaçõs
		Transaction.all.forEach(transactions => {
			//verificar se transação é maior que 0
			//para cada transação se for maior que 0  
			if (transactions.amaout > 0) {
				//somar a uma variável e retornar ela
				income += transactions.amaout
			}
		})

		return income
	},

	expenses() {
		//somar as saídas
		let expense = 0
		//pegar todas as transaçõs
		Transaction.all.forEach(transactions => {
			//verificar se transação é maior que 0
			//para cada transação se for maior que 0  
			if (transactions.amaout < 0) {
				//somar a uma variável e retornar ela
				expense += transactions.amaout
			}
		})

		return expense
	},

	total() {
		//Entradas - Saídas
		let total = Transaction.incomes() + Transaction.expenses()
		return total
	}

}//funções das transações objeto com médotos


//pegar as transações do meu objeto JS e colocar no HTML


const DOM = {
	transactionsContainer: document.querySelector('#data-table tbody'),

	addTransaction(transaction, index) {
		// console.log('CHEGAMOS, NÃO ANTES POR CAUSA DA VÍRGULA')
		// console.log(transaction)
		const tr = document.createElement('tr')//croiando o tr 
		tr.innerHTML = DOM.innerHTMLTransaction(transaction) // CHAMANDO O HTML E ADICONANDO DENTRO DO TR COM INNERHTML
		// console.log(tr.innerHTML)
		DOM.transactionsContainer.appendChild(tr)//adicionando ao tbody o filho tr criado no js
	},//adicionar transação

	innerHTMLTransaction(transactions) {
		const CSSclass = transactions.amaout > 0 ? "income" : "expense"//classe dinâmica
		const amaout = Utilis.formatCurrency(transactions.amaout)
		const html = `			
		
			<td class="${CSSclass}">${transactions.description}</td>
			<td class="${CSSclass}">${amaout}</td>	
			<td class="${CSSclass}">${transactions.date}</td>
			<td>
				<img src="assets/minus.svg" alt="Remover Transação">
			</td>
		`
		return html
	},
	UpdateBalance() {
		document.getElementById("incomeDisplay").innerHTML = Utilis.formatCurrency(Transaction.incomes())
		document.getElementById("expenseDisplay").innerHTML = Utilis.formatCurrency(Transaction.expenses())
		document.getElementById("totalDisplay").innerHTML = Utilis.formatCurrency(Transaction.total())

	},//mostrar os valores dos cards atualizaos
	clearTransactions() {
		DOM.transactionsContainer.innerHTML = ""
	}
}//objeto com métodos para pegar o HTML

const Utilis = {
	formatAmaout(value) {
		console.log(value)
	},

	formatCurrency(value) {
		// console.log(value)
		const signal = Number(value) < 0 ? "-" : ""//forçando o value para ser numero e veruiificação de sinal

		value = String(value).replace(/\D/g, "")
		value = Number(value) / 100
		//deixa só as duas casas do valor
		//validação de tranformação em string para usar o .replace
		//expressão regular /\D/g == ache tudo que for numero

		/*Transformar o value em moeda*/
		value = value.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL"
		})
		return signal + value
	}

}//formatação de valores do amaout

const Form = {
	description: document.querySelector('input#description'),
	amaout: document.querySelector('input#date'),
	date: document.querySelector('input#amaout'),

	getValues() {
		return {
			description: Form.description.value,
			amaout: Form.amaout.value,
			date: Form.date.value
		}
	},

	validateFilds() {
		const {
			description, amaout, date
		} = Form.getValues()
		console.log(description, amaout, date)
		if (description.trim() === "" || amaout.trim() === "" || date.trim() === "") {
			throw new Error("[ERRO] PREENCHA TODOS OS CAMPOS")
		}
	},

	formatValues() {
		let {
			description, amaout, date
		} = Form.getValues()
		amaout = Utilis.formatAmaout(amaout)
		console.log(amaout)
	},

	submit(event) {
		event.preventDefault()//não fazer o comportamento padrão de enviar por get

		try {

			//verificar se o form ta preenchido
			// Form.validateFilds()
			//formatar os dados para salvar
			Form.formatValues()
			//salvar 
			//apaga os dados do formulario
			//modal deve fechar
			//atualizar a aplicação
		} catch (error) {
			alert(error.message)
		}
	}
}

const App = {
	init() {
		Transaction.all.forEach(
			transactions => {
				DOM.addTransaction(transactions)
			}

		)//para cada elemento no array faça algo

		// DOM.addTransaction(transactions[0])//aquui são passados o elementos dos array como parâmetro para função
		// DOM.addTransaction(transactions[1])
		// DOM.addTransaction(transactions[2])

		DOM.UpdateBalance()

	},
	reload() {
		DOM.clearTransactions()
		App.init()
	}
}

App.init()

// Transaction.remove(0)

// Transaction.add({
// 	id: 39,
// 	description: "manteiga",
// 	data: "09/10/2002",
// 	amaout: 20,
// })
