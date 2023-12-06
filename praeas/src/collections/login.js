/** @type {import('payload/types').CollectionConfig} */
const login = {
    slug : "login",
    access : {
      read : () => true,
      update : () => true,
      delete : () => true,
      create : () => true
    },
    fields : [
      {
        name: "username",
        type: "text",
        required: true,
      },
      {
        name: "password",
        type: "text",
        required: true,
      },
    ]
  }
  
  export default login