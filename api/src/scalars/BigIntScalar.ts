import { scalarType } from 'nexus';
import { BigIntResolver } from 'graphql-scalars';
import path from 'path';

export type BigIntScalarType = bigint;

export const BigIntScalar = scalarType({
  name: 'Id',
  asNexusMethod: 'id',
  description: BigIntResolver.description,
  parseValue: BigIntResolver.parseValue,
  serialize: BigIntResolver.serialize,
  parseLiteral: BigIntResolver.parseLiteral,
  sourceType: {
    export: 'BigIntScalarType',
    module: path.resolve(__dirname, __filename),
  },
});
