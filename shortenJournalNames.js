let fs = require('fs');
let readline = require('readline');
let AbbrevIso = require('./nodeBundle.js');

let ltwa = fs.readFileSync('LTWA_20170914-modified.csv', 'utf8');
let shortWords = fs.readFileSync('shortwords.txt', 'utf8');
let abbrevIso = new AbbrevIso.AbbrevIso(ltwa, shortWords);

let s = 'International Journal of Geographical Information Science';
console.log('Example:');
console.log(abbrevIso.makeAbbreviation(s));
console.log('');

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
    input: fs.createReadStream('journalsList.txt')
});


let kywd1 = "@STRING{"
let kywd3 = "     \"";
let kywd2 = "\"}\n"; 
let line_no = 0;
var stream = fs.createWriteStream("journalLong.bib", {flags:'w'});
var stream2= fs.createWriteStream("journalShort.bib", {flags:'w'});
rl.on('line', function(line) {
    line_no++;
    let res = line.split("\t")
//    console.log(abbrevIso.makeAbbreviation(line));
    stream.write(kywd1+res[1]+kywd3+res[0]+kywd2);
    stream2.write(kywd1+res[1]+kywd3+abbrevIso.makeAbbreviation(res[0])+kywd2);
  })
.on('end', function(){
    rl.close();
    stream.end();
});



// Create write stream:
//var stream = fs.createWriteStream("abbreviations.txt");
//stream.once('open', function(fd) {
//  rl.on('line', function(line) {
//    line_no++;
//    console.log(abbrevIso.makeAbbreviation(line));
//    stream.write("KYWD1"+line+"KYWD2");
//    //stream.write("KYWD1"+abbrevIso.makeAbbreviation(line)+"KYWD2\n");
//  });
//  stream.end();
//});


//line_no = 0;
// Write to console
// event is emitted after each line
//rl.on('line', function(line) {
//    line_no++;
//    console.log(line, ' --> ', abbrevIso.makeAbbreviation(line));
//    console.log(abbrevIso.makeAbbreviation(line));
//});
