import { asNexusMethod } from 'nexus';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import path from 'path';

export type UploadScalarType = FileUpload;

export const UploadScalar = asNexusMethod(GraphQLUpload, 'upload', {
  export: 'UploadScalarType',
  module: path.resolve(__dirname, __filename),
});
