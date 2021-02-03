const fs = require('fs');
const pattern = /^.*color=navy>(.*)<\/br>(.*)<\/font><\/h4>\r\n\t\t\t(.*)$/m;
const infile = i => `./redchamberdream/${i.toString()}.html`;
for (let i=399; i <= 518; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  const c = m[3].match(/[A-Z]*\.B/mg);
  if (c !== null) console.log(i-398, ' ' , c.map(e => e.substr(0, e.length - 2)));
}  