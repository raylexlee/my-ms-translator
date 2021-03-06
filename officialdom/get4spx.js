/* Modified from ../get4spx.js by Raylex Lee on 30 January 2021
   Purpose : Prepare the small chunk size of ssml parts of each chapter of the fiction
   Usage : node get4spx.js > titles.txt
   Output : 001_?.ssml 002_?.ssml ... 060_?.ssml in sub-directory spx (e.g. fiction has 60 chap
*/
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
const chapterTitle = (i, m) => `${(i-nSecond).toString().padStart(3,'0')}${m[1]}${m[2]}`;
for (let i=nFirst; i <= nLast; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  const paras = m[3].split(regex)
  console.log(chapterTitle(i, m))
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
