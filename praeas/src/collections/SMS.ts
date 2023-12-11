import { CollectionConfig } from "payload/types";

const SMS: CollectionConfig = {
  slug: "SMS",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "text",
      type: "text",
      required: false,
      maxLength: 255,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "customers",
      required: false,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "category",
      required: false,
    },
  ],
};

export default SMS;
