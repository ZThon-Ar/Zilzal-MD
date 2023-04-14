module.exports = {
    name: "السورس",
    alias: ["supportgc"],
    desc: "لـ عـرض قنـاة السـورس الرسميـة على تيليجـرام.",
    cool:3,
    react: "🍁",
    category: "اوامـر عامـه",
    start: async(Zed, m,{pushName}) => {
        m.reply(`Check your DM *${pushName}* Senpai !\n\nI have sent you support group link personally.`)
        let botpic = botImage1
        let txt = `      🧣 *قنـاة الدعـم* 🧣\n\n*${botName}*اول بـوت عـربي على واتسـاب تابـع لـ سـورسات زدثــون يـوزربـوت\n\n*الرابـط:* ${suppL}\n\n*شكـراً لـ استخـدامك سـورس واتسـاب بـوت*`
        await Zed.sendMessage(m.sender,{image:{url:botpic}, caption:txt},{quoted:m})
    }
}