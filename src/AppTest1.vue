<script>
export default {
  data() {
    return {
      name: "Stephen Ramo",
      status: "pending",
      tasks: ["Task 1", "Task 2", "Task 3"],
      link: "https://google.com",
    };
  },
  methods: {
    toggleStatus() {
      if (this.status === "active") {
        this.status = "pending";
      } else if (this.status === "pending") {
        this.status = "inactive";
      } else {
        this.status = "active";
      }
    },
  },
};
</script>
<template>
  <h1>HELLO {{ name }}</h1>
  <br />
  <!-- IF/ELSE DIRECTIVE SAMPLE -->
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else="status">User is inactive</p>
  <br />

  <!-- FOR LOOP SAMPLE -->
  <div>
    <h3>For Loop</h3>
    <ul>
      <li v-for="task in tasks" :key="task">{{ task }}</li>
    </ul>
  </div>
  <br />
  <!-- Href Binding sample -->
  <div>
    <a v-bind:href="link">Click for google</a>
  </div>
  <button @click="toggleStatus">Change Status</button>
</template>

<!-- Adding this with scope will only apply the style in this file -->
<!-- <style scoped>
h1 {
  color: red;
}
</style> -->
