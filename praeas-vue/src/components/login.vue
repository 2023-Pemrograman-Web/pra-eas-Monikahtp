<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login" class="login-form">
        <label for="username">Username:</label>
        <input type="text" v-model="formData.username" required />
  
        <label for="password">Password:</label>
        <input type="password" v-model="formData.password" required />
  
        <button type="submit">Login</button>
  
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formData: {
          username: "",
          password: "",
        },
        loginError: null,
      };
    },
    methods: {
      login() {
        axios
          .get("http://localhost:3000/api/login")
          .then((response) => {
            const fetchedPosts = response.data.docs;
  
            const user = fetchedPosts.find(
              (user) =>
                user.Username === this.formData.username &&
                user.Password === this.formData.password
            );
  
            if (user) {
              // Pass the username as a parameter to the channel page
              this.$router.push({
                name: "channel",
                params: { username: this.formData.username },
              });
            } else {
              this.loginError = "Invalid username or password";
            }
          })
          .catch((error) => {
            console.error("Error fetching login data:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  
  .login-container {
    max-width: 800px;
    margin: 0 auto;  /* Center horizontally using margin: 0 auto; */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute; /* Use position: absolute; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center vertically and horizontally */
  }
  
  .login-form {
    display: grid;
    gap: 10px;
    width: 100%;              /* Set the form width to 100% */
    max-width: 400px;         /* Limit the form width if needed */
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  .error-message {
    color: #e74c3c;
    margin-top: 10px;
  }
</style>
