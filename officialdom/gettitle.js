const nFirst = 3610;
const nLast = 3669;
const nSecond = nFirst - 1;
const fs = require('fs');
const pattern = /^.*color=navy>(.*)<\/br>(.*)<\/font><\/h4>\r\n\t\t\t(.*)$/m;
const infile = i => `./original/${i.toString()}.html`;
const outfile = (i, m) => `${(i-nSecond).toString().padStart(3,'0')}${m[1]}${m[2]}`;
for (let i=nFirst; i <= nLast; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  console.log(outfile(i, m))
}  