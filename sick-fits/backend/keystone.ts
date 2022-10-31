import { config, createSchema } from '@keystone-next/keystone/schema'
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'
import { Product } from './schemas/Product';
import { User } from './schemas/User';
import 'dotenv/config';
import { ProductImage } from './schemas/ProductImage';
const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // This is how long the user can stay signed in 
  secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
  listKey: 'User',    //which schema will be responsible for being a user that can log in 
  identityField: 'email',   // which field in schema will they log in with 
  secretField: 'password',  // which field which they will authenticate themselved with 
  initFirstItem: {      //allows you to create a first user
    fields: [
      'name', 'email', 'password'
    ],
    // TODO: init with roles here 
  }
})

export default withAuth(
  config({
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
      User,
      Product,
      ProductImage
      //schema items to go in here 
    }),
    ui: {
      //Show UI only for people who pass this test 
      isAccessAllowed: ({ session }) => {
        return !!session?.data;     //return true and allow access if user is logged in
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {

      //this is basically a GraphQL Query 
      User: 'id name email'
    })
  })
)