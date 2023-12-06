/** @type {import('payload/types').CollectionConfig} */
const channels = {
    slug : "unique_channels", // Mengganti slug menjadi "unique_channels" atau yang lain yang unik
    access : {
      read : () => true,
      update : () => true,
      delete : () => true,
      create : () => true
    },
    fields : [
      {
        name: "channelName", // Tetap menggunakan field "channelName"
        type: "text",
        required: true,
      },
      {
        name: "password", // Tetap menggunakan field "password"
        type: "text",
        required: true,
      },
      // Anda juga dapat menambahkan field lainnya sesuai kebutuhan
    ]
}

export default channels; // Mengganti nama ekspor menjadi "channels"
