if (localStorage.DolarToDay) {
    window.setInterval(() => {
        window.localStorage.clear()
        quoteDolar()
    }, 500000)
    document.getElementById("valor_dolar").innerHTML = parseFloat(JSON.parse(
        localStorage.DolarToDay)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
} else quoteDolar()

function addZero(nun) {
    return nun <= 9 ? "0" + nun : nun
}

function quoteDolar() {
    let dateNew = new Date()
    let dateFormat = addZero(dateNew.getMonth() + 1) + "-" + addZero(dateNew.getDate()) + "-" + dateNew.getFullYear()

    const fetchReq1 = fetch(`https://economia.awesomeapi.com.br/last/USD-BRL`)
        .then((res) => res.json())

    const fetchReq2 = fetch(`https://economia.awesomeapi.com.br/json/USD-BRL`)
        .then((res) => res.json())

    urlBCB = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia'
    const fetchReq3 = fetch(`${urlBCB}(dataCotacao=@dataCotacao)?@dataCotacao='${dateFormat}'&$format=json`)
        .then((res) => res.json())

    const fetchReq4 = fetch(`https://www.mercadobitcoin.net/api/USDC/ticker/`)
        .then((res) => res.json())

    Promise.all([fetchReq1, fetchReq2, fetchReq3, fetchReq4])
        .then(
            (res) => {
                if (res !== 0 || res !== null || res !== undefined) {
                    if (res[0]["USDBRL"]) {
                        localStorage.setItem("DolarToDay", JSON.stringify(res[0]['USDBRL']['high']))
                        document.getElementById("valor_dolar").innerHTML = parseFloat(JSON.parse(
                            localStorage.DolarToDay)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    }
                    else if (res[1].length > 0) {
                        localStorage.setItem("DolarToDay", JSON.stringify(res[1][0]['high']))
                        document.getElementById("valor_dolar").innerHTML = parseFloat(JSON.parse(
                            localStorage.DolarToDay)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    }
                    else if (res[2].value.length > 0) {
                        localStorage.setItem("DolarToDay", JSON.stringify(res[2].value[0]["cotacaoCompra"]))
                        document.getElementById("valor_dolar").innerHTML = parseFloat(JSON.parse(
                            localStorage.DolarToDay)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    }
                    else {
                        localStorage.setItem("DolarToDay", JSON.stringify(res[3].ticker['buy']))
                        document.getElementById("valor_dolar").innerHTML = parseFloat(JSON.parse(
                            localStorage.DolarToDay)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    }
                }
            }
        )
        .catch((error) => {
            console.log(error)
        })
}