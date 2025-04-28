<script setup>
import { ref, onMounted } from "vue";
// ref() is like useState in react
const name = ref("Stephen Ramo");
const status = ref("active");
const tasks = ref(["Task 1", "Task 2", "Task 3"]);
const newTask = ref("");
const link = ref("https://google.com");

const toggleStatus = () => {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "inactive";
  } else {
    status.value = "active";
  }
};
// Add task function
const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push(newTask.value); // add the task to array
    newTask.value = ""; // clear the task
  }
};

// Delete task function
const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

// The same as react useEffect or jquery $.ajax()
onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks.value = data.map((task) => task.title);
  } catch (error) {
    console.log("Error fetching task");
  }
});
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
      <li v-for="(task, index) in tasks" :key="task">
        <span>
          {{ task }}
        </span>
        <button @click="deleteTask(index)">x</button>
      </li>
    </ul>
  </div>
  <br />
  <hr />

  <!-- Href Binding sample -->
  <div>
    <h3>Link Sample</h3>
    <a v-bind:href="link">Click for google</a>
  </div>
  <hr />
  <h3>Toggle Button sample</h3>
  <button @click="toggleStatus">Change Status</button>
  <hr />
  <!-- FORM SAMPLE -->
  <div>
    <h3>FORM Sample</h3>
    <!-- .prevent is the same as e.preventDefault() -->
    <form @submit.prevent="addTask">
      <label for="newTask">Add Task</label>
      <input type="text" id="newTask" name="newTask" v-model="newTask" />
      <button type="Submit">Add</button>
    </form>
  </div>
</template>

<!-- Adding this with scope will only apply the style in this file -->
<!-- <style scoped>
h1 {
  color: red;
}
</style> -->
