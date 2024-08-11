const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

const webhookUrl = "https://discord.com/api/webhooks/1262390634862346250/mofvVvsxnwggu0Q9qqF90YrmlFn5kLGxRveT9xfivDQhucp_VYON-nHgCZaL-bOvcYP3";

app.post("/webhook", async (req, res) => {
const { executorName } = req.body;

const joinScript = `local teleportService = game:GetService('TeleportService')
local players = game:GetService('Players')

local function findPlayerServer(playerName)
for _, v in pairs(players:GetPlayers()) do
if v.Name == playerName then
return v
end
end
return nil
end

local targetPlayer = findPlayerServer("${executorName}")
if targetPlayer then
teleportService:TeleportToPlaceInstance(game.PlaceId, targetPlayer)
else
print('Player not found.')
end`;

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

await fetch(webhookUrl, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
});

res.status(200).send('Webhook sent');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
