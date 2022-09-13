import { createAppleNotification } from "@azure/notification-hubs/models/notification";
import { createClientContext } from "@azure/notification-hubs/client";
import { sendNotification } from "@azure/notification-hubs/client/sendNotification";

const NOTIFICATIONHUBS_CONNECTION_STRING = "Endpoint=sb://azuresdktestns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=fl1Ff5bQ+Il+VmKQqpx1EBtSZgvw3bt87Vzc7IQG48k=";
const NOTIFICATION_HUB_NAME = "azuresdktesthub";

async function main() {
  const client = createClientContext(NOTIFICATIONHUBS_CONNECTION_STRING, NOTIFICATION_HUB_NAME);

  const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
  const tags = ["likes_hockey", "likes_football"];

  const notification = createAppleNotification({
    body: messageBody,
    headers: {
      "apns-priority": "10",
      "apns-push-type": "alert",
    },
  });

  const result = await sendNotification(client, tags, notification, { enableTestSend: true });
  console.log(`Tag List send Tracking ID: ${result.trackingId}`);
  console.log(`Tag List Correlation ID: ${result.correlationId}`);
  console.log(`Results: ${JSON.stringify(result, null, 2)}`);
}

main().catch((err) => {
  console.log("Sample: Error occurred: ", err);
  process.exit(1);
});
