/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// receipt-parser.ts
import {DocumentProcessorServiceClient, protos} from "@google-cloud/documentai";

type IGcsDocument = protos.google.cloud.documentai.v1.IGcsDocument;
type IProcessRequest = protos.google.cloud.documentai.v1.IProcessRequest;
type IProcessResponse = protos.google.cloud.documentai.v1.IProcessResponse;

// eslint-disable-next-line max-len

const client = new DocumentProcessorServiceClient(
  {
    apiEndpoint: "eu-documentai.googleapis.com",
  });

export async function parseReceipt(
  documentAIProcessorId: string,
  fileBucket: string,
  filePath: string,
  contentType: string
): Promise<protos.google.cloud.documentai.v1.IDocument | null | undefined> {
  const name = client.processorPath("locards-bonny-test", "eu", documentAIProcessorId);
  const gcsDocument: IGcsDocument = {
    gcsUri: `gs://${fileBucket}/${filePath}`,
    mimeType: contentType,
  };
  const request: IProcessRequest = {
    name: name,
    gcsDocument: gcsDocument,
    skipHumanReview: true,
  };

  try {
    const result = await client.processDocument(request);
    const response : IProcessResponse = result[0];
    // const pages = response.document?.pages?.reduce(
    //   (currentPages, page) => [...currentPages, JSON.stringify(page)],
    //     [] as string[]
    // );
    // console.log("Document AI response pages:", pages);
    return response.document;
  } catch (error) {
    console.error("Failed to process document:", error);
    throw error;
  }
}
