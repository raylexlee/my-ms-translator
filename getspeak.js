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
const infile = i => `./redchamberdream/${i.toString()}.html`;
const outfile = i => `./ssml/${(i-398).toString().padStart(3,'0')}.ssml`;
for (let i=399; i <= 518; i++) {
  const rawdata = fs.readFileSync(infile(i), {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  const bodyVoice = voiceText(voiceName[1], m[3].replace(regex, subst));
  const titleVoice = voiceText(voiceName[2], `${m[1]}${subst}${m[2]}`);
  fs.writeFileSync(outfile(i), ssml(titleVoice, bodyVoice));
}  