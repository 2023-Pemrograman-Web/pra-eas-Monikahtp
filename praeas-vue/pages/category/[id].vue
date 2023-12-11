<template>
  <NuxtLink
    to="/chat"
    class="hidden md:block absolute top-6 right-6 text-[#ffff] bg-[#160252] font-semibold p-3 cursor-pointer rounded-md select-none"
  >
    Channels
  </NuxtLink>

  <div class="flex justify-center py-6 w-full">
    <div
      class="block w-[90%] sm:w-[50%] h-[83vh] rounded-md overflow-y-auto scrollbar p-3"
      style="background: #000000;"
    >
      <div v-for="display in displays" :key="display.id">
        <div
          :class="{'flex justify-end': display.user.id == chatNow.user, 'flex justify-start': display.user.id !== chatNow.user}"
        >
          <div
            class="rounded-md text-[#ffff] px-6 py-2 min-w-[70%] max-w-full mb-4"
            style="background: linear-gradient(to right, #4e148c, #160252);"
          >
            <div class="font-semibold text-[#FFD700]">{{ display.user.full_name }}</div>
            <div>{{ display.text }}</div>
          </div>
        </div>
      </div>

      <!-- Input field for typing messages -->
      <div class="flex justify-between mt-4">
        <input
          v-model="newMessage"
          type="text"
          class="w-[70%] rounded-md px-4 py-2 bg-[#1e1e1e] border-none text-white focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          @click="sendMessage"
          class="w-[20%] rounded-md px-4 py-2 bg-[#4e148c] text-white hover:bg-[#52021a] focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Display Chat
const displays = ref([]);

const displayChat = async (categoryId) => {
  try {
    const res = await fetch(
      "http://localhost:8000/api/SMS?limit=100&sort=createdAt"
    );
    const data = await res.json();

    const filteredDisplays = data.docs.filter((display) => {
      return display.category && display.category.id === categoryId;
    });

    displays.value = filteredDisplays;
  } catch (error) {
    console.error("Error fetching and displaying chat:", error);
  }
};

// Create Chat
const chatNow = ref({
  user: "",
  category: "",
  text: "",
});

const startChat = async () => {
  try {
    const { data: responseData } = await useFetch(
      "http://localhost:8000/api/SMS",
      {
        method: "POST",
        body: {
          user: chatNow.value.user,
          category: chatNow.value.category,
          text: chatNow.value.text,
        },
      }
    );
    console.log(responseData.value);

    // Fetch and display the updated chat after starting the chat
    await displayChat(chatNow.value.category);
  } catch (error) {
    console.error("Error starting chat:", error);
  }
};

// Fetch Category Id
const fetchCategory = async () => {
  const id = router.currentRoute.value.params.id;
  try {
    const response = await fetch(`http://localhost:8000/api/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      chatNow.value.category = data.id;
      // Fetch and display the chat for the current category
      await displayChat(data.id);
    }
  } catch (error) {
    console.error("Error fetching category:", error);
  }
};

// Fetch current user data
const fetchCurrentUser = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/customers/me", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await response.json();
    if (userData && userData.user && userData.user.id) {
      chatNow.value.user = userData.user.id;
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};

// Typing and Sending messages
const newMessage = ref('');

const sendMessage = async () => {
  try {
    const response = await useFetch("http://localhost:8000/api/SMS", {
      method: "POST",
      body: {
        user: chatNow.value.user,
        category: chatNow.value.category,
        text: newMessage.value,
      },
    });

    if (response.status === 200) {
  // Clear the input field after sending the message
  newMessage.value = '';

  // Fetch and display the updated chat after sending the message
  await displayChat(chatNow.value.category);

    } else {
      // Handle error
      console.error('Failed to send message');
    }
    
    // Fetch and display the updated chat after sending the message
    await displayChat(chatNow.value.category);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

onMounted(async () => {
  await fetchCategory();
  await fetchCurrentUser();
});
</script>