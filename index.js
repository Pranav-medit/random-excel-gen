const fs = require('fs');
let randomWords;
 const XLSX = require('xlsx');
 function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function getRandomNum(length) {

    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    
    }

function randomDate(start, end) {
    const date =  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().slice(0, 10);
}
function getRandomDate(){
    return randomDate(new Date(2012, 0, 1), new Date());
}


function getRandomFromArray(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}
function getWords(data,length){
  let words = "";
  for(var i=0;i<length;i++){
    words+= getRandomFromArray(data)
  }
  return words; 
}

function writeExcelSheet(data,path){ 
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Responses')
    XLSX.writeFile(wb,path)
}
function capitalizeFirstLetter(strToCapitalize) {
    return strToCapitalize[0].toUpperCase() + strToCapitalize.slice(1);
}
function separateCharactersUponUppercase(strInput, firstCap) {
    if (firstCap) {
        return capitalizeFirstLetter(strInput.split(/(?=[A-Z])/).join(" "));
    }
    return strInput.split(/(?=[A-Z])/).join(" ");
}
function generateExcel(excelRules,excelRows,path='output.xlsx'){
  const excelDatas = [];
  for(let i=0; i<excelRows; i++){
    let excelData={};
    for(const excelRule of excelRules){
      const {heading,rule,raw} = excelRule;
      const length = rule?.split?.(":")?.[1] ?? 1;
      switch(true){
        case raw != null:
          excelData[heading] = getRandomFromArray(rule)
          break;
        case rule.includes("words"):
          excelData[heading] = getWords(randomWords,length)
          break;
        case rule.includes("randomAlphaNumber"):
          excelData[heading] = makeId(length)
          break;
        case rule.includes("randomNumber"):
          excelData[heading] = getRandomNum(length)
          break;
        case rule.includes("randomDate"):
          excelData[heading] = getRandomDate()
          break;
        default:
          console.log("OK")
      }
    }
    excelDatas.push(excelData);
  }
  path = path ?? 'output.xlsx';
  writeExcelSheet(excelDatas,path);
}
try{
  randomWords = fs.readFileSync('./randomWords.txt', 'utf-8');
  randomWords = randomWords.split(" ");
}catch(e){
  randomWords = ['lorem','ipsum ']
}
// console.log(randomWords); 
// text , randomFromArray, randomNumber:length, randomAlphaNumber:length, randomDate
// generateExcel([{heading:"heading1", rule:"words" },{heading:"heading2",rule:"randomDate"}],10)

module.exports = generateExcel;