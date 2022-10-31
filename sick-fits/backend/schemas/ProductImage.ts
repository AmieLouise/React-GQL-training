import { cloudinaryImage } from '@keystone-next/cloudinary';
import { list } from '@keystone-next/keystone/schema';
import { relationship, text } from '@keystone-next/fields'

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sickfits'
}

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({      //ProductImages uploaded in keystone will automatically save in cloudinary 
      cloudinary,
      label: 'source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photo' })
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product']
    }
  }
})