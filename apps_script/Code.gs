function onOpen() {
  DocumentApp.getUi()
  .createMenu('Opinion Oracle')
  .addItem('Ask the Customers', 'showSidebar')
  .addToUi();
  
}


function callOracles(){

  const text = getSelectedText()

  if(text.length < 150){
    Logger.log("text: ",text)
    return "I don't have enough info to go on"
  }

    const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({input: text}),
    headers: {
      "ngrok-skip-browser-warning" : "any"
    },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch("", options)

  const data = JSON.parse(response.getContentText());
  return data
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Ask the Customers');
  DocumentApp.getUi().showSidebar(html);  
}

function getSelectedText() {
  const body = DocumentApp.getActiveDocument().getBody();
  if (!body) return 'No text present.';

  return body.getText()
}