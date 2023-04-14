module.exports = {
  name: "منشن",
  alias: ["htag", "ping"],
  desc: "Tag all group member without @ mention",
  category: "اوامـر المجمـوعـة",
  usage: "منشن + نـص",
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isAdmin, participants, args }
  ) => {
    if (!isAdmin)
      return m.reply(mess.useradmin);

      var message = "*『 منشٓن لـ الكـل 』*";

    if(m.quoted){
        message = "*『 منشٓن لـ الكـل 』*";
      }
    else if (!text && m.quoted) {
      message = `${m.quoted ? m.quoted.msg : ''}`;
    }
    else if(args[0]){
      message = args.join(' ');
    }
    else if(text ===''){
      message = "*『 منشٓن لـ الكـل 』*";
    }
   
    else{
      message = "*『 منشٓن لـ الكـل 』*";
    }
    await Zed.sendMessage(
      m.from,
      { text: message, mentions: participants.map((a) => a.id) },
      { quoted: m }
    );
  },
};
