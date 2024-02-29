function gerarCNPJ() {
    const n = 9;
    let randomNumber = () => {
        let rnd = Math.floor(Math.random() * n);
        console.log(`Generated random number: ${rnd}`);
        return rnd;
    };
    let n1 = randomNumber(), n2 = randomNumber(), n3 = randomNumber(), n4 = randomNumber(),
        n5 = randomNumber(), n6 = randomNumber(), n7 = randomNumber(), n8 = randomNumber(),
        n9 = 0, n10 = 0, n11 = 0, n12 = 1;
    console.log(`Initial CNPJ numbers: ${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}`);
    let d1 = calcularDigito([n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12], [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    let d2 = calcularDigito([n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    console.log(`Digits: d1=${d1}, d2=${d2}`);
    return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
}

function calcularDigito(digitos, pesos) {
    let soma = digitos.reduce((acumulado, numeroAtual, indice) => {
        let partialSum = acumulado + (numeroAtual * pesos[indice]);
        console.log(`Partial sum for index ${indice}: ${partialSum}`);
        return partialSum;
    }, 0);
    let resto = soma % 11;
    console.log(`Sum: ${soma}, Remainder: ${resto}`);
    return resto < 2 ? 0 : 11 - resto;
}

function formatarCNPJ(cnpj) {
    console.log(`Formatting CNPJ: ${cnpj}`);
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}


function verificarElementoEExibirPopup() {
    // Utilizando CSS Selector fornecido
    const selector = ".sc-ksJxCS > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)";
    let elemento = document.querySelector(selector);

    if (elemento) {
        console.log("Element found with specified CSS Selector.");
        const popupHTML = `
            <div id="meuPopupCustomizado" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; background-color: white; border: 1px solid #ccc; padding: 10px; box-shadow: 0px 0px 5px #ccc;">
                <p>CNPJ detectado. Deseja preencher com um valor aleatório?</p>
                <button id="preencherCnpjBtn">Preencher CNPJ</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        document.getElementById('preencherCnpjBtn').addEventListener('click', function () {
            if (elemento.value) {
                console.log(`CNPJ atual: ${elemento.value}`);
                console.log("Substituindo CNPJ existente por um novo.");
            }
            let cnpjGerado = formatarCNPJ(gerarCNPJ());
            console.log("CNPJ gerado: " + cnpjGerado);
            elemento.value = cnpjGerado; // Substitui o valor existente pelo novo CNPJ gerado
            console.log("Setting element value to generated CNPJ.");
            elemento.dispatchEvent(new Event('input', { bubbles: true }));
            elemento.dispatchEvent(new Event('change', { bubbles: true }));
            console.log("Dispatched 'input' and 'change' events.");
            document.getElementById('meuPopupCustomizado').remove();
            console.log("Popup removed.");
        });
    } else {
        console.log("Element with specified CSS Selector not found.");
    }
}

verificarElementoEExibirPopup();


verificarXPathEExibirPopup();