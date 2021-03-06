const voiceName = [ "zh-HK-HiuGaaiNeural", "zh-HK-HiuMaanNeural", "zh-HK-WanLungNeural" ];
const voiceText = (voice, text) => `<voice name="${voice}">
        ${text}
    </voice>`;
const ssml = voices => `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-HK">
    ${voices}
</speak>
`;
const story = `第十五回
　　　　　王鳳姐弄權鐵檻寺　秦鯨卿得趣饅頭庵
　　話說寶玉舉目見北靜王世榮頭上戴著淨白簪纓銀翅王帽，穿著江牙海水五爪龍白蟒袍，繫著碧玉紅鞓帶，面如美玉，目似明星，真好秀麗人物。`;
const file = ssml(story.split("\n").map((line,i) => voiceText(voiceName[i], line)).join("\n"));
console.log(file);
