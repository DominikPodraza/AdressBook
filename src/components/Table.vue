<template>
  <div>
    <q-table
      :rows="props.adressBook"
      :columns="columns"
      row-key="id"
      @row-click="onRowClick"
      :filter="filter"
    >
      <template #body-cell-delete="scope">
        <q-td auto-width>
          <q-btn-group>
            <q-btn
              color="red"
              icon="delete"
              @click.stop="deleteEntryRow(scope.row.id)"
            />
          </q-btn-group>
        </q-td>
      </template>

      <template #header-cell-delete>
        <q-td auto-width>
          <q-btn-group>
            <q-btn color="green" icon="add" @click="dialog = true" />
            <AddDialog v-model="dialog" />
          </q-btn-group>
        </q-td>
      </template>

      <template v-slot:top-right>
        <q-input
          outlined
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
import AddDialog from "./AddDialog.vue";
import { ref } from "vue";
import { Entry, adressBookService } from "@/services/adressBookService";
import { router } from "@/router";

const { deleteEntry } = adressBookService();

import { useQuasar } from "quasar";
const $q = useQuasar();

const filter = ref<string>("");
const dialog = ref<boolean>(false);

const emit = defineEmits<{
  (e: "refreshData"): void;
}>();

const props = defineProps<{
  adressBook: Entry[];
}>();

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
    name: "address",
    field: "address",
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
  {
    name: "delete",
    field: "delete",
    label: "Usun",
  },
];

async function deleteEntryRow(id: number) {
  const isDeleted: boolean = await deleteEntry(id);
  if (isDeleted) {
    router.push({
      name: "home",
    });
    emit("refreshData");
    $q.notify({
      message: "Usunięto wpis",
      color: "green",
    });
  }
}

async function onRowClick(e: Event, entry: Entry) {
  const id: number = entry.id;

  router.push({
    name: "details",
    params: {
      entryId: id,
    },
  });
  e;
}
</script>

<style lang="scss" scoped></style>
