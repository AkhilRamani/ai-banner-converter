import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Cache S3Client instance
let s3Client: S3Client | null = null;
let cachedConfig: { accountId: string; defaultBucketName: string } | null = null;

const getS3Client = () => {
  if (!s3Client || !cachedConfig) {
    const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
    const accountId = process.env.R2_ACCOUNT_ID!;
    const defaultBucketName = process.env.R2_BUCKET_NAME!;

    s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    cachedConfig = { accountId, defaultBucketName };
  }

  return { client: s3Client, ...cachedConfig };
};

export const uploadToR2 = async (
  file: File | Buffer,
  key: string,
  contentType?: string,
  bucketName?: string
): Promise<{ url: string; key: string }> => {
  const { client, accountId, defaultBucketName } = getS3Client();
  const targetBucket = bucketName || defaultBucketName;

  const command = new PutObjectCommand({
    Bucket: targetBucket,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await client.send(command);

  const url = `https://${targetBucket}.${accountId}.r2.cloudflarestorage.com/${key}`;
  return { url, key };
};

export const deleteFromR2 = async (key: string, bucketName?: string): Promise<void> => {
  const { client, defaultBucketName } = getS3Client();
  const targetBucket = bucketName || defaultBucketName;

  const command = new DeleteObjectCommand({
    Bucket: targetBucket,
    Key: key,
  });

  await client.send(command);
};

export const getR2PublicUrl = (key: string, bucketName?: string): string => {
  const { accountId, defaultBucketName } = getS3Client();
  const targetBucket = bucketName || defaultBucketName;
  return `https://${targetBucket}.${accountId}.r2.cloudflarestorage.com/${key}`;
};
