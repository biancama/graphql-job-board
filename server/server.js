import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';

// 1. Import from the new modern packages
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@as-integrations/express5';


import { readFile } from 'node:fs/promises';
import { resolvers } from './resolver.js';

const PORT = 9000;
const app = express();

// 2. Global REST middleware (for your /login route)
app.use(cors(), express.json());
app.post('/login', handleLogin);

// 3. Initialize Apollo Server
const typeDefs = await readFile('./schema.graphql', 'utf-8');
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

// 4. Apply modern Express middleware integration 
// Pass your authMiddleware here if it needs to protect GraphQL or inject data into context
app.use(
  '/graphql',
  cors(), 
  express.json(), 
  authMiddleware, // Applied specifically to the GraphQL endpoint
  apolloMiddleware(apolloServer, {
    // Optional: Pass context down to your resolvers
    context: async ({ req }) => ({
      user: req.user, // Assuming authMiddleware attaches the user to the request object
    }),
  })
);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
});