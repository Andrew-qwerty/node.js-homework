let primer = process.argv.slice(2);
//console.log(primer);
var add = require("./add");
var sub = require("./sub");
var div = require("./div");
var mult = require("./mult");
const {readFile, writeFile} = require("fs");
const {spawn, fork, exec} = require('child_process');
var numbers = [];
var opetations = [];
var message;
//console.log('Процесс запущен на с ID: ' + process.pid);
function sort (primer) {
  for (var i = 0; i < primer.length; i++) {
    if (!isNaN(primer[i]) && (i%2) ==0 ) {
      numbers.push(Number (primer[i]))
    } else if ((primer[i]=='add'|| primer[i] =='sub'|| primer[i] == 'mult'|| primer[i] == 'div') && (i%2) != 0) {
        opetations.push(primer[i])     
    } else {
      message = `Введено недопустимое значение ${primer[i]}`
      //console.error (`Введено недопустимое значение ${primer[i]}`);
      return message;
    }
  }
  return numbers, opetations
}


const operator = function (operator, a, b) {
  if (operator == 'add') {
    return add(a, b)
  } else if (operator == 'sub') {
    return sub(a, b)
  } else if (operator == 'mult') {
    return mult(a, b)
  } else if (operator == 'div') {
    return div(a, b)
  }
}
function calc (numbers, opetations) {
  var result=numbers[0];
  for (var i = 0; i < opetations.length; i++) {
    var result = operator (opetations[i], result, numbers[i+1])
  }
  console.log(result);
  return result;
  
}
/*sort();
console.log(numbers);
console.log(opetations);
calc(numbers, opetations);*/


function writeResult(result){
  return new Promise ((resolve, reject) => {
    writeFile('./result.txt', String(result), (err) => {
        resolve(result);
    });
  })
}
function writeError(errortext){
  return new Promise ((resolve, reject) => {
    writeFile('./error.txt', String(errortext), (err) => {
  });
  })
}
//write(calc(numbers, opetations));

try {
  sort(primer);
  if (message) throw Error (message);
}
catch(error) {
    console.error (error);
    writeError(error);
}

//calc (numbers, opetations);


writeResult(calc (numbers, opetations))
.then ((result) => {
    console.log('Результат '+ result + ' успешно записан в файл');
  })
.catch((error) => {
    writeError(error)
})

/*var workerProcess = exec('node . calc', 'numbers, opetations', function 
      (error, stdout, stderr) {
      
      if (error) {
        writeError(error)
      }
      console.log('Процесс запущен на с ID: ' + process.pid);
   });
 
  workerProcess.on('exit', function (result) {
      writeResult(result)
      .then ((result) => {
          console.log('Результат '+ result + ' успешно записан в файл');
        })
      .catch((error) => {
          writeError(error)
      })
  });*/
