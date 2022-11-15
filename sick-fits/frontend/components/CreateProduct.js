import { useMutation } from "@apollo/client";
import gql from 'graphql-tag'
import useForm from "../lib/useForm"
import Form from './styles/Form'
import DisplayError from './ErrorMessage'


const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION( 
    $image: Upload
    $name: String!
    $price: Int!
    $description: String!
  ) {
    createProduct(
      data:{
        name: $name,
        description:$description,
        price:$price
        photo: {
          create: {
            image: $image,
            altText: $name
          }
        }
        status: "AVAILABLE"
      }
    ) {
      id
      price
      description
      name
    }
  }
`

export default function CreateProduct() {
  const {inputs, handleChange, clearForm, resetForm} = useForm({
    image:'',
    name: 'ProductName',
    price: 2342,
    description:'Product Description'
  });

  const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs
  })

  return (
    <Form onSubmit={async (e) => {
      e.preventDefault();
      console.log(inputs)
      const res = await createProduct()
      console.log(res)
    }}>

      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading} >
        <label htmlFor='image' >
          Image:
          <input required type='file' name='image' id='image' onChange={handleChange}/>
        </label>

        <label htmlFor='name' >
          Name: 
          <input type='text' name='name' id='name' placeholder='Name' value={inputs.name} onChange={handleChange}/>
        </label>

        <label htmlFor='price' >
          Price: 
          <input type='number' name='price' id='price' placeholder='price' value={inputs.price} onChange={handleChange}/>
        </label>

        <label htmlFor='description' >
          Description: 
          <textarea type='number' name='description' id='description' placeholder='description' value={inputs.description} onChange={handleChange} />
        </label>

        <button type='submit'>Add Product</button>
      </fieldset>

      {/* <button type='button' onClick={clearForm}> Clear Form </button>
      <button type='button' onClick={resetForm}> Reset Form </button> */}
    </Form>
  )
}
