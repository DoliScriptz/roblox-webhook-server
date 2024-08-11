const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

const webhookUrl = "https://discord.com/api/webhooks/1262390634862346250/mofvVvsxnwggu0Q9qqF90YrmlFn5kLGxRveT9xfivDQhucp_VYON-nHgCZaL-bOvcYP3";

app.post("/webhook", async (req, res) => {
  const { executorName } = req.body;
  console.log("Received request:", req.body);

  const joinScript = `local teleportService = game:GetService('TeleportService')
local players = game:GetService('Players')

local function findPlayerServer(playerName)
for _, v in pairs(players:GetPlayers()) do
if v.Name == playerName then
return v;
}
end
return nil;
end

local targetPlayer = findPlayerServer("${executorName}")
if (targetPlayer) {
teleportService:TeleportToPlaceInstance(game.PlaceId, targetPlayer)
} else {
print('Player not found.')
}`;

  const data = {
    content: null,
    embeds: [{
      title: "Script Executed!",
      description: `${executorName} has executed the script!`,
      color: 16711680,
      fields: [{
        name: "Join the Server",
        value: `Run this script to join their server:\`\`\`lua
${joinScript}
\`\`\``
      }]
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
          console.log("Webhook sent:", data);
    res.status(200).send('Webhook sent');
  } catch (error) {
    console.error("Error sending webhook:", error);
    res.status(500).send('Error sending webhook');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});
