<template>
  <div>
    <q-table
      :rows="entries"
      :columns="columns"
      row-key="id"
      @row-click=""
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Szukaj"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { Entry, adressBookService } from "@/services/adressBookService";

const { getAdressBook } = adressBookService();

const entries: Ref<Entry[]> = ref([]);
const filter = ref<string>("");

const columns = [
  {
    name: "id",
    field: "id",
    label: "ID ",
    sortable: true,
  },
  {
    name: "nick",
    field: "nick",
    label: "Login",
  },
  {
    name: "firstName",
    field: "firstName",
    label: "Imie",
  },
  {
    name: "lastName",
    field: "lastName",
    label: "Nazwisko",
  },
  {
    name: "telephone",
    field: "telephone",
    label: "Numer Telefonu",
  },
  {
    name: "email",
    field: "email",
    label: "E-mail",
  },
  {
    name: "adress",
    field: "adress",
    label: "Adress",
  },
  {
    name: "city",
    field: "city",
    label: "Miasto",
  },
  {
    name: "postalCode",
    field: "postalCode",
    label: "Kod Pocztowy",
  },
];

defineExpose({
  refreshData,
});

async function refreshData() {
  entries.value = await getAdressBook();
}

onMounted(async () => {
  entries.value = await getAdressBook();
});
</script>

<style lang="scss" scoped></style>
