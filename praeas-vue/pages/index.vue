<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2D4059] to-[#EA5455]">
    <div class="max-w-3xl mx-auto text-center text-white">
      <h1 class="text-6xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
        Welcome to <br />
        <span class="text-[#F67280]">FastChat</span>
      </h1>
      <p class="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">
        Chat and connect with people around you
      </p>
      <div class="flex justify-center gap-4 animate__animated animate__fadeIn animate__delay-3s">
        <NuxtLink
          to="/chat"
          class="bg-[#F67280] py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#FF8474] transition duration-300"
        >
          Login
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="bg-[#F67280] py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#FF8474] transition duration-300"
        >
          Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
