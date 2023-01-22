
# Random excel data generator

The Random Excel Generator is a Utility tool built with Node.js that generates an excel file based on passed rules.


## Install

`npm install random-excel-gen`

## Usage
```
const randomExcelGen = require("random-excel-gen");
randomExcelGen([{
        heading:"heading1", 
        rule:"words" 
    },{
        heading:"heading2",
        rule:"randomDate"
    }],10,"two.xlsx");
```
## Input

 * **excelRules** : An array of objects containing the excel column heading, rule, and raw data.
 * **excelRows**  : The number of rows to populate with random data in the excel sheet.
 * **path**       : The path where the excel sheet should be saved. If no path is provided, it will save the sheet as 'output.xlsx' in the root directory.

 ## Excel Rules

 It is an array of excel rules. Each rule object contains,

 * **heading** : Heading of the excel column
 * **rule**    : Rule for the excel column

 ## Rules 

 * **"words"** :  generates random words.
 ```
 ex: {
        heading:"heading2",
        rule:"words"
    } 
```
 **Note**: you can define explicit file named "randomWords.txt" and provide words seperated by space to override it ex:'lorem ipsum etc'
 
----
 * **"randomAlphaNumber:length"** :  generates random alphabets+numbers with specified length.
 ```
 ex: {
        heading:"heading2",
        rule:"randomAlphaNumber:10"
    } 
```
-----
 * **"randomNumber:length"** :  generates random numbers with specified length.
 
 ```
 ex: {
        heading:"heading2",
        rule:"randomNumber:10"
    } 
```
----
 * **"date"** :  generates random date.
 
 ```
 ex: {
        heading:"heading2",
        rule:"date"
    } 
```
