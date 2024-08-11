const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

const webhookUrl = "https://discord.com/api/webhooks/1262390634862346250/mofvVvsxnwggu0Q9qqF90YrmlFn5kLGxRveT9xfivDQhucp_VYON-nHgCZaL-bOvcYP3";

// Log server start
console.log("Starting server...");

// Define webhook endpoint
app.post("/webhook", async (req, res) => {
  const { executorName } = req.body;

  // Log incoming request
  console.log("Received request for executor:", executorName);

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

  // Construct webhook message
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
    // Send webhook message
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Log webhook sent
    console.log(`Webhook sent for executor: ${executorName}`);
    res.status(200).send('Webhook sent');
  } catch (error) {
    // Log error if failed
    console.error("Error sending webhook:", error);
    res.status(500).send('Error sending webhook');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
