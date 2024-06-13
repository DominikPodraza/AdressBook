<template>
  <div>
    <Table v-model="entries" @refresh-data="refreshData"></Table>
  </div>
</template>

<script lang="ts" setup>
import Table from "@/components/Table.vue";
import { onMounted, ref } from "vue";
import { Entry, adressBookService } from "@/services/adressBookService";

const { getAdressBook } = adressBookService();

const entries = ref<Entry[]>([]);

async function refreshData() {
  entries.value = await getAdressBook();
}

onMounted(async () => {
  entries.value = await getAdressBook();
});
</script>
