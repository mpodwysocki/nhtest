import { createAppleNotification, NotificationHubsServiceClient } from "@azure/notification-hubs";

const NOTIFICATIONHUBS_CONNECTION_STRING = "<connection-string>";
const NOTIFICATION_HUB_NAME = "<hub-name>";

async function main() {
  const client = new NotificationHubsServiceClient(NOTIFICATIONHUBS_CONNECTION_STRING, NOTIFICATION_HUB_NAME);

  const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
  const tags = ["likes_hockey", "likes_football"];

  const notification = createAppleNotification({
    body: messageBody,
    headers: {
      "apns-priority": "10",
      "apns-push-type": "alert",
    },
  });

  const result = await client.sendNotification(tags, notification, { enableTestSend: true });
  console.log(`Tag List send Tracking ID: ${result.trackingId}`);
  console.log(`Tag List Correlation ID: ${result.correlationId}`);
}

main().catch((err) => {
  console.log("Sample: Error occurred: ", err);
  process.exit(1);
});
