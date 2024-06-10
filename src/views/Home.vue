<template>
  <div>
    <Form v-if="isAdded" @added="refreshData" @close="close"></Form>
    <Table :adress-book="entries" @refresh-data="refreshData"></Table>
  </div>
</template>

<script lang="ts" setup>
import Table from "@/components/Table.vue";
import { onMounted, ref } from "vue";
import { Entry, adressBookService } from "@/services/adressBookService";

const { getAdressBook } = adressBookService();

const isAdded = ref<boolean>(false);
const entries = ref<Entry[]>([]);

function close() {
  isAdded.value = false;
}

async function refreshData() {
  entries.value = await getAdressBook();
}

onMounted(async () => {
  entries.value = await getAdressBook();
});
</script>
