import { asNexusMethod } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import path from 'path';

export type DateTimeScalarType = Date;

export const DateTimeScalar = asNexusMethod(DateTimeResolver, 'dateTime', {
  export: 'DateTimeScalarType',
  module: path.resolve(__dirname, __filename),
});
