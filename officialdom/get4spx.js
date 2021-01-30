const nFirst = 3610;
const nLast = 3669;
const nSecond = nFirst - 1;
const fs = require('fs');
const voiceName = [ "zh-HK-HiuGaaiNeural", "zh-HK-HiuMaanNeural", "zh-HK-WanLungNeural" ];
const voiceText = (voice, text) => `<voice name="${voice}">
        ${text}
    </voice>`;
const ssml = (title, body) => `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-HK">
    ${title}
    ${body}
</speak>
`;
const subst = `<break time="100ms" />`;
const regex = /<br>/mg;
const pattern = /^.*color=navy>(.*)<\/br>(.*)<\/font><\/h4>\r\n\t\t\t(.*)$/m;
const infile = i => `./original/${i.toString()}.html`;
const outfile = (i, j) => `./spx/${(i-nSecond).toString().padStart(3,'0')}_${j}.ssml`;
for (let i=nFirst; i <= nLast; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  const paras = m[3].replace(/<img src=\/mpf\/h\/HUHN\.BMP align=absmiddle border=0>/gm, '雞')
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
                        .replace(/<img src=\/mpf\/l\/LTIT.BMP align=absmiddle border=0>/gm, '『衤莽』')
                        .split(regex)
  paras.pop();
  paras.pop();                      
  const titleVoice = voiceText(voiceName[2], `${m[1]}${subst}${m[2]}`);
  let j = 0;
  let accPara = '';
  let cnt = 0;
  while (paras.length) {
    if ((cnt + 2*(paras[0].length) + subst.length) > 4500) {
      j++;
      const bodyVoice =  voiceText(voiceName[1], accPara);
      const title = (j === 1) ? titleVoice : '';
      fs.writeFileSync(outfile(i, j), ssml(title, bodyVoice));
      cnt = 0;
      accPara = '';
    }
    const topPara = paras.shift();
    accPara = `${accPara}${subst}${topPara}`;
    cnt += 2*(topPara.length) + subst.length;
  }
  if (accPara) {
      j++;
      const bodyVoice =  voiceText(voiceName[1], accPara);
      const title = (j === 1) ? titleVoice : '';
      fs.writeFileSync(outfile(i, j), ssml(title, bodyVoice));
  }
}  