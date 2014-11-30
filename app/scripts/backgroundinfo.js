var GoogleSpreadsheet = require("google-spreadsheet");
var network_sheet = new GoogleSpreadsheet('1TA4xbLdIqxmYOT7DgOhcRXZipmzUaaVi8yh2bPPmsDY');
var network = "init";

// SHOULD return object with [name, domain, country, launched, owner, funded, slogan]
function backgroundInfoByDomain(domain) {
  network_sheet.getRows(1, function(err, row_data){    
    row_data.forEach(function(row) {
      if (row.domain == domain) { return row; } // TOFIX
    });
  })
}