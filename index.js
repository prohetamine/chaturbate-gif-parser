const rp  = require('request-promise')
    , fs  = require('fs')

const word = () => {
  const s = 'qwertyuiopasdfghjklzxcvbnm1234567890_-'

  return Array(parseInt(Math.random() * 20)+2).fill(false).map(e => s[parseInt(Math.random() * s.length)]).join('')
}

const instance = async () => {
  const data = await rp('https://emote.highwebmedia.com/autocomplete?slug='+word())
  fs.appendFile(__dirname+'/urls', JSON.parse(data).emoticons.map(e => e.url).join('\n')+'\n', () => {})
}

;(async () => {
  let i = 0
  for (;;) {
    i++
    console.log(i)
    await Promise.all(Array(10).fill(10).map(e => instance()))
  }
})()
