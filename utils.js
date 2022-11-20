export function sanitizeStringWithTableRows(tableRows) {
    let secureRows = DOMPurify.sanitize("<table>" + tableRows + "</table>")
    secureRows = secureRows.replace("<table>", "").replace("</table>", "")
    return secureRows
}