const Discord = require("discord.js");
const { settings } = require("cluster");
const client = new Discord.Client();
const setting = require('./settings.json')
const prefix = "!";


function info(msg) {
  console.log(`[INFO] ${msg}`);
}


    


client.on("ready", () => {
  console.log(`--------------------------------------------`);
  info(`${client.user.tag} is ready`);
  info(`prefix: ${prefix}`);
});

client.on("message", (msg) => {
  const args = msg.content.split(" ");
  const cmd = msg.content.slice(1, msg.content.length);

  const where = [
    "롯데리아",
    "목욕탕",
    "피시방",
    "놀이터",
    "동네",
    "공터",
    "초등학교",
    "중학교",
    "고등학교",
    "모텔",
    "대학교",
    "백화점",
    "은행",
    "호수"
  ];

  const doing = [
    "화장실문지기",
    "훔쳐보는",
    "몰래들어가는",
    "파괴하는",
    "관종",
    "자전거도둑",
    "신발도둑",
  ];

  if (!msg.content.startsWith(prefix)) return;

  if (cmd.startsWith("randUm")) {
    let nick =
      where[Math.floor(Math.random() * where.length)] +
      doing[Math.floor(Math.random() * doing.length)] +
      msg.author.username;

    info(args);

    if (args.length === 1) {
      let embed = new Discord.MessageEmbed()
        .setColor("#42f55a")
        .setTitle("성공")
        .setDescription(`**\`${nick}\`**로 변경이 완료되었습니다.\n\n※봇의 역할 권한이 명령어를 쓰는 사람보다 높지 않으면 닉네임이 바뀌지 않습니다. \n(서버 관리자는 명령어를 쓸 수 없습니다.)`);
      msg.channel.send(embed);
      msg.member.setNickname(nick, "엄준식");
    } else if (args.length === 2) {
      let nick =
        where[Math.floor(Math.random() * where.length)] +
        doing[Math.floor(Math.random() * doing.length)] +
        args[1];

      let embed = new Discord.MessageEmbed()
        .setColor("#42f55a")
        .setTitle("성공")
        .setDescription(`**\`${nick}\`**로 변경이 완료되었습니다.\n\n※봇의 역할 권한이 명령어를 쓰는 사람보다 높지 않으면 닉네임이 바뀌지 않습니다. \n(서버 관리자는 명령어를 쓸 수 없습니다.)`);

      msg.channel.send(embed);
      msg.member.setNickname(nick, "엄준식");
    } else if (args.length === 3) {
      let well = args[2];
      let nick =
        well +
        where[Math.floor(Math.random() * where.length)] +
        doing[Math.floor(Math.random() * doing.length)] +
        args[1];

      let embed = new Discord.MessageEmbed()
        .setColor("#42f55a")
        .setTitle("성공")
        .setDescription(`**\`${nick}\`** 로 닉네임 변경이 완료되었습니다. \n\n※봇의 역할 권한이 명령어를 쓰는 사람보다 높지 않으면 닉네임이 바뀌지 않습니다. \n(서버 관리자는 명령어를 쓸 수 없습니다.)`);
      msg.channel.send(embed);
      msg.member.setNickname(nick, "엄준식");
    }
  } else if (cmd === "help") {
    let embed = new Discord.MessageEmbed()
      .setColor("#42f55a")
      .setTitle("How To Use")
      .setDescription(
        "1. !randUm [닉네임] [거주지]\n2. 닉네임을 적지 않으면 디스코드 이름이 들어간다\n3. 거주지를 적지 않으면 거주지가 들어가지 않은 닉네임이 만들어진다\n4. 닉네임에 띄어쓰기를 넣으면 제대로 작동하지 않는다\n5. 엄준식은 존재한다."
      );
    msg.channel.send(embed);
  }
});


client.login(setting.token)
