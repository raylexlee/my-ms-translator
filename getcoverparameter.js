const fs = require('fs');
const pattern = /^.*<title>(.*)<\/title>.*$/m;
const infile = i => `./redchamberdream/${i.toString()}.html`;
const outfile = (i, m) => `${(i-398).toString().padStart(3,'0')} ${m[1].replace(/[-　]/g, ' ')}`;
for (let i=399; i <= 518; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  console.log(outfile(i, m))
}  