import { makeSchema } from 'nexus';
import { applyMiddleware } from 'graphql-middleware';
import { shield } from 'graphql-shield';
import { GraphQLSchema } from 'graphql';
import path from 'path';

import * as Scalars from './scalars';
import * as Util from './schemas/Util';
import * as Auth from './schemas/auth';

const nexusSchema = makeSchema({
  types: [Scalars, Util, Auth],
  outputs: {
    schema: path.join(__dirname, 'generated/schema.graphql'),
    typegen: path.join(__dirname, 'generated/schema.d.ts'),
  },
  contextType: {
    module: path.join(__dirname, 'types/Context.d.ts'),
    export: 'Context',
  },
  prettierConfig: path.join(__dirname, '../../.prettierrc.json'),
}) as unknown as GraphQLSchema;

const permissions = shield({});

export const schema = applyMiddleware(nexusSchema, permissions);
