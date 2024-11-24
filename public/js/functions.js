function copyReference() {
    var copyText = document.getElementById("referenceCode");

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);

}

function copyIban() {
    var copyText = document.getElementById("accountNumber");

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);

}

function changeInput(input) {
    const output = document.getElementById("witdrawInput")
    output.value = input;
}
    