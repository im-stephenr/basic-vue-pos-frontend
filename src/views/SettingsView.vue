<script setup>
// IMPORTING COMPONENT FILES
import PageTitle from "@/components/PageTitle.vue";
import MainContent from "@/components/MainContent.vue";
import SettingsCard from "@/components/settings/SettingsCard.vue";
</script>
<template>
  <!-- MAIN CONTENT -->
  <MainContent>
    <PageTitle title="Settings" />
    <div class="flex p-10 gap-x-5">
      <SettingsCard
        title="Manage Account"
        url="manage-account"
        icon="pi pi-user"
      />
    </div>
  </MainContent>
</template>
