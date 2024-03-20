var express = require("express");
var router = express.Router();

const sentences = [
  "生活不止眼前的苟且，还有诗和远方。在漫长的人生旅途中，我们不断追寻着内心的向往与梦想。",
  "心若没有栖息的地方，到哪里都是在流浪。但当我们懂得珍惜内心的宁静与满足，内心就是最美丽的栖息之所。",
  "人生没有彩排，每天都是现场直播。每个人都在这个世界上扮演着自己独特的角色，无论是平凡还是辉煌。",
  "世上没有绝对的幸福，只有相对的幸福与比较的幸福。在追求幸福的过程中，我们或许会感到迷茫，但请相信，幸福就在身边。",
  "生活中总有许多不如意，但总有一些美好值得我们珍惜。当我们学会感恩，生活中的每一个细节都会因感恩而变得幸福与美好。",
];

const code = {
    
}

function generateRandomSentence() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

/* GET users listing. */
router.get("/chat-room", function (req, res) {
  const qusetion = req.query.qusetion;
  console.log("ceshi", qusetion);
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  if (!qusetion) {
    return res.status(400).send("miss qusetion");
  }
  const data = generateRandomSentence();

  res.write("data:" + data + "\n\n");
});

module.exports = router;
