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
            <q-dialog v-model="dialog" @hide="reset">
              <q-card>
                <q-card-section class="row items-center q-gutter-sm">
                  <q-input filled v-model="nick" label="Login:" />
                  <q-input filled v-model="firstName" label="Imię:" />
                  <q-input filled v-model="lastName" label="Nazwisko:" />
                  <q-input filled v-model="telephone" label="Numer Telefonu:" />
                  <q-input filled v-model="email" label="Email:" />
                  <q-input filled v-model="adress" label="Adres:" />
                  <q-input filled v-model="city" label="Miasto:" />
                  <q-input filled v-model="postalCode" label="Kod Pocztowy:" />
                  <div>
                    <q-btn
                      label="Dodaj"
                      type="submit"
                      color="primary"
                      @click="add()"
                    />
                    <q-btn
                      label="Resetuj"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                      @click="reset()"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
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
import { ref } from "vue";
import { Entry, Status, adressBookService } from "@/services/adressBookService";
import { router } from "@/router";

const { deleteEntry, addEntry } = adressBookService();

import { useQuasar } from "quasar";
const $q = useQuasar();

const filter = ref<string>("");
const emit = defineEmits<{
  (e: "refreshData"): void;
}>();
const props = defineProps<{
  adressBook: Entry[];
}>();

const dialog = ref<boolean>(false);

const nick = ref<string>();
const firstName = ref<string>();
const lastName = ref<string>();
const telephone = ref<string>();
const email = ref<string>();
const adress = ref<string>();
const city = ref<string>();
const postalCode = ref<string>();

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

function reset() {
  firstName.value = "";
  lastName.value = "";
  nick.value = "";
  telephone.value = "";
  email.value = "";
  adress.value = "";
  city.value = "";
  postalCode.value = "";
}

async function add() {
  const addStatus: Status = await addEntry({
    firstName: firstName.value,
    lastName: lastName.value,
    nick: nick.value,
    telephone: telephone.value,
    email: email.value,
    address: adress.value,
    city: city.value,
    postalCode: postalCode.value,
  });

  switch (addStatus.status) {
    case 200:
      emit("refreshData");
      reset();
      $q.notify({
        message: "Dodano wpis.",
        color: "green",
      });
      break;

    case 400:
      nick.value = "";
      $q.notify({
        message: addStatus.message as string,
        color: "red",
      });
      break;

    default:
      break;
  }
}
</script>

<style lang="scss" scoped></style>
