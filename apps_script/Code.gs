function onOpen() {
  DocumentApp.getUi()
  .createMenu('Opinion Oracles')
  .addItem('Ask the Customers', 'showSidebar')
  .addToUi();
  
}

function callOracles(){

  const text = getSelectedText()

  if(text.length < 150){
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
  Logger.log(text)
  Logger.log("logging")
  const response = UrlFetchApp.fetch("", options)
  Logger.log(response)
  const data = JSON.parse(response.getContentText());
  return data
}

function showSidebar(){
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
  .setTitle('Ask the Customers')
  DocumentApp.getUi().showSidebar(html);
}

function getSelectedText() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) return 'No text selected.';

  const elements = selection.getRangeElements();
  let text = '';
  elements.forEach(el => {
    if (el.getElement().editAsText) {
      const elementText = el.getElement().asText().getText().substring(
        el.getStartOffset(),
        el.getEndOffsetInclusive() + 1
      );
      text += elementText + ' ';
    }
  });
  return text.trim();
}