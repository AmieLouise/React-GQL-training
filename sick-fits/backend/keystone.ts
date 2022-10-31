import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema'

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // This is how long the user can stay signed in 
  secret: process.env.COOKIE_SECRET
}

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    }
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    //TODO: Add data seeding here 
  },
  lists: createSchema({
    //schema items to go in here 
  }),
  ui: {
    //TODO change this to roles later on 
    isAccessAllowed: () => true,
  },
  //TODO add session values here 
})