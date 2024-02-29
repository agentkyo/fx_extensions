document.getElementById('preencherCnpjBtn').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "preencherCNPJ" }, function (response) {
            if (response && response.result === "success") {
                console.log("CNPJ preenchido com sucesso!");
            } else {
                console.log("Falha ao preencher CNPJ.");
            }
        });
    });
});
