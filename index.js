const { get } = require('superagent')
const { Client, MessageEmbed } = require('discord.js')

const { where, doing, track, ajemt } = require('./data/datas.json')
const { token, prefix = '!' } = require('./settings.json')

/**
 * @param {string[]} arr
 * @returns {string}
 */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const bold = (txt) => { return `**${txt}**` }
const spoiler = (txt) => { return `||${txt}||` }

const client = new Client()
client.login(token)
client.on('ready', () => console.log(client.user.username + ' is now online'))
client.on('message', async (msg) => {
  const { author, content, channel } = msg

  if (author.bot) return
  if (track.indexOf(content) > -1) return channel.send(track[track.indexOf(content) + 1])

  if (!content.startsWith(prefix)) return

  const slices = content.substring(prefix.length).split(' ')
  const args = slices.slice(1)
  const cmd = slices[0]

  switch (cmd) {
    case 'randUm':
    case 'randum': {
      const nick = (args[1] || '') + pick(where) + pick(doing) + (args[0] || author.username)
      await msg.member.setNickname(nick, '엄준식').catch(() => {})

      let embed = new MessageEmbed({
        title: '성공',
        description: bold(nick) + '로 변경이 완료되었습니다.',
        color: 0x42f55a
      })

      if (msg.member.nickname !== nick) {
        embed = new MessageEmbed({
          title: '실패',
          description: bold(nick) + '로 변경하지 못했습니다.\n봇의 역할 권한이 명령어를 쓰는 사람보다 높아 실패하는 경우가 많습니다.',
          color: 0xff0000
        })
      }

      msg.channel.send(embed)
      break
    }

    case 'aje':
    case '아재': {
      const res = await get('https://aje.teamwv.ml/api/json')
      const embed = new MessageEmbed({ color: 0x42f55a, title: 'Q. ' + res.body.que, description: '제한시간: 30초' })

      let answered = false
      const collector = channel.createMessageCollector((m) => m.author.id === author.id, { time: 30000 })
      collector.on('collect', (collected) => {
        if (answered) return

        if (res.body.answer === collected.content) {
          answered = true
          return channel.send(pick(ajemt.correct))
        }

        if (res.body.answer.includes(collected.content)) channel.send(pick(ajemt.similar))
        else channel.send(pick(ajemt.wrong))
      })

      collector.on('end', () => {
        if (!answered) channel.send('시간 끝! 정답은... ' + spoiler(res.body.answer))
      })

      channel.send(embed)
      break
    }
  }
})
