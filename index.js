const { Client, MessageEmbed } = require("discord.js");
const axios = require('axios')
const client = new Client();
const { token } = require('./settings.json')
const prefix = '!'

const makeDes = (nick) => { return `**\`${nick}\`**로 변경이 완료되었습니다.\n\n※봇의 역할 권한이 명령어를 쓰는 사람보다 높지 않으면 닉네임이 바뀌지 않습니다. \n(서버 관리자는 명령어를 쓸 수 없습니다.)`}

const where = [ "롯데리아", "목욕탕", "피시방", "놀이터", "동네", "공터", "초등학교", "중학교", "고등학교", "모텔", "대학교", "백화점", "은행", "호수" ]
const doing = [ "화장실문지기", "훔쳐보는", "몰래들어가는", "파괴하는", "관종", "자전거도둑", "신발도둑" ]
const helpEmbed = new MessageEmbed({color:"#42f55a", title:"How To Use", description:"1. !randUm [닉네임] [거주지]\n2. 닉네임을 적지 않으면 디스코드 이름이 들어간다\n3. 거주지를 적지 않으면 거주지가 들어가지 않은 닉네임이 만들어진다\n4. 닉네임에 띄어쓰기를 넣으면 제대로 작동하지 않는다\n5. 엄준식은 존재한다.\n\n[초대링크](https://discord.com/api/oauth2/authorize?client_id=737503637399666711&permissions=134217728&scope=bot)"})

client.on("ready", () => {
  console.log(`[System] Start`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return
  if (msg.content === '엄') msg.channel.send('준')
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.split(" ");
  const cmd = msg.content.slice(1, msg.content.length);

  if (cmd.startsWith("randUm")) {
    let nick = [where[Math.floor(Math.random() * where.length)] + doing[Math.floor(Math.random() * doing.length)] + msg.author.username,
    where[Math.floor(Math.random() * where.length)] + doing[Math.floor(Math.random() * doing.length)] + args[1], 
    args[2] + where[Math.floor(Math.random() * where.length)] + doing[Math.floor(Math.random() * doing.length)] + args[1]][args.length - 1]

    msg.channel.send(new MessageEmbed({title:'성공', description: makeDes(nick), color:'#42f55a'}))
    msg.member.setNickname(nick, "엄준식")
  } else if (cmd === "help") msg.channel.send(helpEmbed)
  else if (cmd === 'aje') {
    axios.request({ method: 'GET', url: 'https://aje.teamwv.ml/api/json', headers: { 'Content-Type': 'application/json' }})
    .then(res => {
      msg.channel.send(new MessageEmbed({title: res.data.que, description: '과연 답은? 두구두구두구', color:'#42f55a'}))
      setTimeout(() => msg.channel.send(new MessageEmbed({title: res.data.que, description: `||${res.data.answer}||`, color:'#42f55a'})), 3000)
    })
  }
})

client.login(token)
