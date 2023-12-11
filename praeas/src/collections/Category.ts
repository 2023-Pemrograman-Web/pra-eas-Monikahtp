import { CollectionConfig } from "payload/types";

const Category: CollectionConfig = {
  slug: "category",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      maxLength: 200,
    },
  ],
};

export default Category;
