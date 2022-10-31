import { list } from "@keystone-next/keystone/schema";
import { integer, select, text, relationship } from '@keystone-next/fields';

export const Product = list({
  // TODO
  // access: 
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      }
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      }
    }),  // references the product field within the ProductImage datatype to create link between two fields in different types 
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' }
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: {
          fieldMode: 'hidden'   // This will hide the status selection when crating a new Product item.  But will appear when you edit the item after creation. 
          // Useful to speed up creation, especially where a default value is provided 
        }
      }
    }),
    price: integer(),  //integer because we're dealing with everything in pence to avoid dealing with decimals. 800 = £8.00
    //TODO: Photo 
  }
})