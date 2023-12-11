<template>
  <div>
    <div class="sm:hidden block absolute bottom-6 left-6 text-[#f8f8f8] bg-gradient-to-r from-[#2D4059] via-[#784BA0] to-[#2B86C5] font-semibold p-4 cursor-pointer rounded-sm select-none" @click="handleLogout">
      Logout
    </div>
    <div class="sticky top-0 min-h-[10vh] bg-gradient-to-r from-[#2D4059] via-[#784BA0] to-[#2B86C5] w-full flex justify-between items-center py-4 px-6">
      <form @submit.prevent="startCategory" enctype="multipart/form-data" class="flex gap-2">
        <input
          type="text"
          v-model="categoryNow.name"
          placeholder="Add new category"
          required
          class="bg-[#F8F8F8] border-none focus:outline-none text-lh rounded-sm px-4"
        />
        <button class="text-[#2e2e2e] bg-gradient-to-r from-[#2D4059] via-[#784BA0] to-[#2B86C5] font-semibold p-4 rounded-md select-none">
          Add
        </button>
      </form>
      <div class="hidden sm:block"></div>
      <div class="hidden sm:block text-[#f8f8f8] bg-gradient-to-r from-[#2D4059] via-[#784BA0] to-[#2D4059] font-semibold p-4 cursor-pointer rounded-sm select-none" @click="handleLogout">
        Logout
      </div>
    </div>
    <div class="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-6 mt-6">
      <div v-for="category in categories" :key="category.id" class="bg-gradient-to-r from-[#2D4059] via-[#784BA0] to-[#2B86C5] text-[#F8F8F8] rounded-md h-[30vh] p-6 flex flex-col justify-between">
        <div class="text-xl">
          <span v-if="category.editing">
            <input v-model="category.updatedName" @keyup.enter="updateCategory(category.id)" @blur="cancelUpdate(category)" class="border-none bg-black focus:outline-none text-lh text-white rounded-sm px-2" />
          </span>
          <span v-else>
            {{ category.name }}
          </span>
        </div>
        <div class="fill-[#f8f8f8] flex gap-2">
          <NuxtLink :to="`/category/${category.id}`" class="cursor-pointer">Enter</NuxtLink>
          <button @click="category.editing = true; category.updatedName = category.name" class="cursor-pointer">Edit</button>
          <button @click="deleteCategory(category.id)" class="cursor-pointer text-white bg-red-500" :class="{ 'text-red-500': !category.editing }">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Read Category
const categories = ref([]);
const fetchCategory = async () => {
  const response = await fetch("http://localhost:8000/api/category");
  const data = await response.json();
  categories.value = data.docs;
};

onMounted(() => {
  fetchCategory();
});

// Create Category
const categoryNow = ref({
  name: "",
});

const startCategory = async () => {
  const { data: responseData } = await useFetch(
    "http://localhost:8000/api/category",
    {
      method: "POST",
      body: {
        name: categoryNow.value.name,
      },
    }
  );
  router.go();
  console.log(responseData.value);
};

// Read JSON
const currentUser = ref("");
onMounted(async () => {
  const userData = await getUser();
  if (!userData) {
    router.push("/login");
  } else {
    currentUser.value = userData;
  }
});

const getUser = async () => {
  const res = await fetch("http://localhost:8000/api/customers/me", {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json())?.user;
  return data;
};

// Logout Request
const handleLogout = async () => {
  const res = await fetch("http://localhost:8000/api/customers/logout", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    console.log("Successfully logged out");
    router.go();
  }
};

// Update Category
const updateCategory = async (categoryId) => {
  const updatedName = categories.value.find(category => category.id === categoryId).updatedName;

  try {
    const res = await fetch(`http://localhost:8000/api/category/${categoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedName,
      }),
    });

    if (res.ok) {
      console.log(`Category with ID ${categoryId} updated successfully`);
      // Update categories without refreshing the page
      categories.value = categories.value.map(category =>
        category.id === categoryId ? { ...category, name: updatedName, editing: false } : category
      );
    } else {
      console.error(`Failed to update category with ID ${categoryId}`);
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Cancel Update
const cancelUpdate = (category) => {
  category.editing = false;
};

// Delete Category
const deleteCategory = async (categoryId) => {
  try {
    const res = await fetch(`http://localhost:8000/api/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log(`Category with ID ${categoryId} deleted successfully`);
      // Remove the deleted category without refreshing the page
      categories.value = categories.value.filter(category => category.id !== categoryId);
    } else {
      console.error(`Failed to delete category with ID ${categoryId}`);
    }
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
</script>
