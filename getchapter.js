const fs = require('fs');
const pattern = /^.*color=navy>(.*)<\/br>(.*)<\/font><\/h4>\r\n\t\t\t(.*)$/m;
const html = m => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  ${m[1]}<br>
  ${m[2]}<br>
  ${m[3].replace(/<img src=\/mpf\/h\/HUHN\.BMP align=absmiddle border=0>/gm, '雞').replace(/<img src=\/mpf\/h\/HUAU\.BMP align=absmiddle border=0>/gm,'巴') }  
</body>
</html>`;
const infile = i => `./redchamberdream/${i.toString()}.html`;
const outfile = i => `./converted/${(i-398).toString().padStart(3,'0')}.html`;
for (let i=399; i <= 518; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  fs.writeFileSync(outfile(i), html(m));
}  