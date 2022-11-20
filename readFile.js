const submitForm = document.getElementById("form1")
const fileUploaded = document.getElementById("uploaded-file")

function sanitizeStringWithTableRows(tableRows) {
    let secureRows = DOMPurify.sanitize("<table>" + tableRows + "</table>")
    secureRows = secureRows.replace("<table>", "").replace("</table>", "")
    return secureRows
}

function csvFileToArray(str, delimiter = ";") {
    const headers = str.slice(0, str.indexOf("\n") - 1).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    return rows.map(function (row) {
        const values = row.split(delimiter);
        return headers.reduce(function (object, header, index) {
            object[header] = values[index].replace('\r', "");
            return object;
        }, {});
    });
}

function arrayIntoRows(arr) {
    return arr.map(obj => `
<tr>
    <td>${obj.firstName}</td>
    <td>${obj.lastName}</td>
    <td>${obj.eMail}</td>
    <td>+${obj.phoneNumber}</td>
</tr>`).join("");
}

function readFile(evt) {
    evt.preventDefault();
    const file = fileUploaded.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function (evt) {
        const plainText = evt.target.result;
        const arrayOfObj = csvFileToArray(plainText);
        document.getElementById("file-upload-tbody").innerHTML = sanitizeStringWithTableRows(arrayIntoRows(arrayOfObj));
    };
    fileReader.readAsText(file);
}

submitForm.onsubmit = readFile;
