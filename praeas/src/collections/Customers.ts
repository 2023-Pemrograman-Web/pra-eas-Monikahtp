import { CollectionConfig } from "payload/types";

const Customers: CollectionConfig = {
  slug: "customers",
  auth: true,
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "full_name",
      type: "text",
      required: false,
      maxLength: 200,
    },
  ],
};

export default Customers;
