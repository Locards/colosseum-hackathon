/* eslint-disable max-len */
import {onObjectFinalized} from "firebase-functions/v2/storage";
import {defineString} from "firebase-functions/params";
import {parseReceipt} from "./receipt-parser";
import {PubSub} from "@google-cloud/pubsub";


const enum Status {
  Successful = "successful",
  Failed = "failed",
}

// custom config see also https://firebase.google.com/docs/functions/config-env?gen=2nd
// current bucket that triggers this function: locards-bonny-test.appspot.com
const bucket = defineString("TRIGGER_BUCKET");
// currenct processor id 3262dc507be2c947
const documentAIProcessorIdConfig = defineString("DOCUMENT_AI_PROCESSOR_ID");
const cloudFunctionRegion = "europe-west3"; // Frankfurt

export const processUpload = onObjectFinalized(
  {
    region: cloudFunctionRegion,
    bucket: bucket,
  },
  async (event) => {
    if (process.env.FUNCTIONS_EMULATOR) {
      console.log("Running in emulator mode");
    }
    const fileBucket = event.data.bucket;
    const filePath = event.data.name;
    const contentType = event.data.contentType;
    const userId = event.data.metadata?.userId;
    const fcmToken = event.data.metadata?.fcmToken;
    const couponKey = event.data.metadata?.couponKey;
    const md5hash = event.data.md5Hash; // TODO: use for checking duplicates before sending to documentAI
    console.log(`Data:${Object.keys(event.data)}`);
    console.log(
      `File ${filePath} uploaded to ${fileBucket}. userId: ${userId}`
    );

    const pubsub = new PubSub();
    const topic = pubsub.topic("projects/locards-bonny-test/topics/extracted-receipt-data");

    // TODO: extract this part in a method and throw exception with message instead sending to topic. Call this within the try-block below.
    if (!filePath || !contentType || !userId || !md5hash) {
      console.log("Missing userId, md5hash, file path or content type");
      await topic.publishMessage({
        json: {
          "userId": userId,
          "entities": null,
          "status": Status.Failed,
        },
        attributes: {
          bucket: fileBucket,
          filePath: filePath,
        },
      });
      // TODO: delete uploaded file here
      return;
    }
    // TODO: check for if file already uploaded


    try {
      const parsedDocument = await parseReceipt(
        documentAIProcessorIdConfig.value(),
        fileBucket,
        filePath,
        contentType
      );
      await topic.publishMessage({
        json: {
          "userId": userId,
          "entities": parsedDocument?.entities,
          "status": Status.Successful,
        },
        attributes: {
          bucket: fileBucket,
          filePath: filePath,
          contentType: contentType,
          userId: userId,
          md5hash: md5hash,
          fcmToken: fcmToken || "",
          couponKey: couponKey || "",
        },
      });
      console.log("Successfully published document to topic 'extracted-receipt-data'");
    } catch (error) {
      await topic.publishMessage({
        json: {
          "userId": userId,
          "entities": null,
          "status": Status.Failed,
        },
        attributes: {
          bucket: fileBucket,
          filePath: filePath,
          contentType: contentType,
          userId: userId,
          fcmToken: fcmToken || "",
          couponKey: couponKey || "",
        },
      });
      // TODO: delete uploaded file
      console.error("Failed to process document:", error);
    }
  });

