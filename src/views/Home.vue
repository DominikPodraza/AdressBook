<template>
  <div>
    <Menu @tab-change="getTabChange"></Menu>
    <Form v-if="isAdded" @added="Added"></Form>
    <Table ref="table"></Table>
  </div>
</template>

<script lang="ts" setup>
import Table from "@/components/Table.vue";
import Form from "@/components/Form.vue";
import Menu from "@/components/Menu.vue";
import { ref } from "vue";

interface X {
  refreshData: Function;
}

const isAdded = ref<boolean>(false);
const table = ref<X | null>(null);

function getTabChange(tab: string) {
  if (tab === "add") {
    isAdded.value = true;
    return;
  }
  isAdded.value = false;
}

const callRefreshDataMethod = () => {
  if (table.value !== null) {
    table.value.refreshData();
  }
};

function Added() {
  callRefreshDataMethod();
}
</script>
