const nFirst = 3610;
const nLast = 3669;
const nSecond = nFirst - 1;
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
  ${m[3].replace(/<img src=\/mpf\/h\/HUHN\.BMP align=absmiddle border=0>/gm, '雞')
        .replace(/<img src=\/mpf\/h\/HUAU\.BMP align=absmiddle border=0>/gm, '巴')
        .replace(/<img src=\/mpf\/r\/RQJL\.BMP align=absmiddle border=0>/gm, '『口邦』')
        .replace(/<img src=\/mpf\/c\/CHHIO.BMP align=absmiddle border=0>/gm, '『分瓜』')
        .replace(/<img src=\/mpf\/g\/GOJBC.BMP align=absmiddle border=0>/gm, '『走真』')
        .replace(/<img src=\/mpf\/h\/HUPH.BMP align=absmiddle border=0>/gm, '『毛必』')
        .replace(/<img src=\/mpf\/o\/OIFSU.BMP align=absmiddle border=0>/gm, '『食卷』')
        .replace(/<img src=\/mpf\/h\/HRFLN.BMP align=absmiddle border=0>/gm, '『烏刂』')
        .replace(/<img src=\/mpf\/r\/RHHW.BMP align=absmiddle border=0>/gm, '『口留』')
        .replace(/<img src=\/mpf\/d\/DHGY.BMP align=absmiddle border=0>/gm, '『木靠』')
        .replace(/<img src=\/mpf\/h\/HUWTJ.BMP align=absmiddle border=0>/gm, '『毛畢』')
        .replace(/<img src=\/mpf\/h\/HUVII.BMP align=absmiddle border=0>/gm, '『毛幾』')
        .replace(/<img src=\/mpf\/l\/LTIT.BMP align=absmiddle border=0>/gm, '『衤莽』') }
</body>
</html>`;
const infile = i => `./original/${i.toString()}.html`;
const outfile = i => `./converted/${(i-nSecond).toString().padStart(3,'0')}.html`;
for (let i=nFirst; i <= nLast; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  fs.writeFileSync(outfile(i), html(m));
}  