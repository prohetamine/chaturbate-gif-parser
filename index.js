const rp  = require('request-promise')
    , fs  = require('fs')

const word = () => {
  const s = 'qwertyuiopasdfghjklzxcvbnm1234567890_-'

  return Array(parseInt(Math.random() * 20)+2).fill(false).map(e => s[parseInt(Math.random() * s.length)]).join('')
}

const instance = async () => {
  try {
    const url = 'https://emote.highwebmedia.com/autocomplete?slug='+word()
    console.log(url)
    return await rp(url)
  } catch (e) {}
}

;(async () => {
  let i = 0
  for (;;) {
    i++
    const datas = await Promise.all(
      Array(10)
        .fill(true).map(
          (e, i2) =>
            instance()
        )
    )

    fs.appendFileSync(__dirname+'/urls.txt', datas.map(data => data ? JSON.parse(data).emoticons.map(e => e.url) : []).flat().join('\n')+'\n')
  }
})()
