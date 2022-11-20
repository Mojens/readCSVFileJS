function csvToArray(str, delimiter = ";") {
    const headers = str.slice(0,str.indexOf("\n")-1).split(delimiter);
    const rows = str.slice(str.indexOf("\n")+1).split("\n");
    return rows.map(function (row) {
        const values = row.split(delimiter);
        return headers.reduce(function (object, header, index) {
            object[header] = values[index].replace('\r', "");
            return object;
        }, {});
    });
}

function arrayIntoRows(arr) {
    return arr.map(obj =>
        `
<tr>
    <td>${obj.firstName}</td>
    <td>${obj.lastName}</td>
    <td>${obj.eMail}</td>
    <td>${obj.phoneNumber}</td>
</tr>`).join("");
}


function readFile() {
    const submitForm = document.getElementById("form1")
    const fileUploaded = document.getElementById("uploaded-file")
    if (submitForm != null) {
        submitForm.addEventListener("submit", function (evt) {

            evt.preventDefault();
            const file = fileUploaded.files[0];
            const fileReader = new FileReader();

            fileReader.onload = function (evt) {
                const text = evt.target.result;
                const arrayOfObj = csvToArray(text);
                console.log(arrayOfObj);
               document.getElementById("file-upload-tbody").innerHTML = arrayIntoRows(arrayOfObj);
            };
            fileReader.readAsText(file);
        });
    }
}

readFile()