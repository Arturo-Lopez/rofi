import aws from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { PutObjectRequest, DeleteObjectRequest } from 'aws-sdk/clients/s3';
import { FileUpload } from 'graphql-upload';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_ENDPOINT, S3_BUCKET_NAME } = process.env;

const awsEndpoint = new aws.Endpoint(S3_ENDPOINT || '');

const s3 = new aws.S3({
  endpoint: awsEndpoint,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const getFileBufferFromStream = async (file: FileUpload) => {
  const { createReadStream, mimetype } = await file;

  const buffers: Array<Uint8Array> = [];
  let fileBuffer: Buffer | undefined;

  if (!mimetype.startsWith('image/')) {
    return fileBuffer;
  }

  await new Promise((resolve, reject) => {
    createReadStream()
      .on('data', (buffer) => {
        const newBuffer: Uint8Array = Buffer.from(buffer);
        buffers.push(newBuffer);
      })
      .on('end', () => {
        fileBuffer = Buffer.concat(buffers);
        resolve(true);
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  return fileBuffer;
};

// Available scopes inside the bucket
export enum FileScope {
  PROFILE = 'profile',
}

export const uploadFileS3 = async (file: Buffer, mimetype: string, scope: FileScope) => {
  const options: PutObjectRequest = {
    Bucket: S3_BUCKET_NAME,
    Key: `${scope}/${uuid()}`,
    Body: file,
    ContentType: mimetype,
    ACL: 'public-read',
  };

  return s3.upload(options).promise();
};

export const isValidFileUrl = (url: string) => {
  if (!url) return false;

  return url.includes(S3_ENDPOINT);
};

export const deleteFileS3 = async (fileUrl: string): Promise<void> => {
  if (!isValidFileUrl(fileUrl)) return;

  // Clean url and get "key" of object which consist of a "folder" and a "name"
  const key = fileUrl.split('/').reverse().slice(0, 2).reverse().join('/');

  const options: DeleteObjectRequest = {
    Bucket: S3_BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(options).promise();
};
