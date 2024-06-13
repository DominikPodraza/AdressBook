<template>
  <q-dialog v-model="showDialog" @hide="reset" style="min-width: 30%">
    <q-card>
      <q-card-section class="colum items-center q-gutter-sm">
        <q-input filled v-model="nick" label="Login:" />
        <q-input filled v-model="firstName" label="Imię:" />
        <q-input filled v-model="lastName" label="Nazwisko:" />
        <q-table
          flat
          bordered
          title="Numery Telefonu"
          :rows="phoneNumbers"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:top-right>
            <q-btn color="green" icon="add" @click="" />
          </template>
          <template #body-cell-delete="scope">
            <q-td auto-width>
              <q-btn
                color="red"
                icon="delete"
                @click.stop="deleteEntryRow(scope.row.id)"
              />
            </q-td>
          </template>

          <template #body-cell-isDefault="scope">
            <q-toggle v-model="scope.row.isDefault" />
          </template>

          <q-td auto-width> </q-td>
        </q-table>

        <q-input filled v-model="email" label="Email:" />
        <q-input filled v-model="adress" label="Adres:" />
        <q-input filled v-model="city" label="Miasto:" />
        <q-input filled v-model="postalCode" label="Kod Pocztowy:" />
        <div>
          <q-btn label="Dodaj" type="submit" color="primary" @click="add()" />
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
</template>

<script lang="ts" setup>
import {
  PhoneNumber,
  Status,
  adressBookService,
} from "@/services/adressBookService";
import { ref } from "vue";

import { useQuasar } from "quasar";
const $q = useQuasar();

const { addEntry } = adressBookService();

const showDialog = defineModel({ type: Boolean, required: true });

const nick = ref<string>();
const firstName = ref<string>();
const lastName = ref<string>();
const telephone = ref<string>();
const email = ref<string>();
const adress = ref<string>();
const city = ref<string>();
const postalCode = ref<string>();
const phoneNumbers = ref<PhoneNumber[]>([
  { isDefault: true, number: "123123123" },
]);

const columns = [
  {
    name: "number",
    field: "number",
    label: "Numer Telefonu ",
    align: "center",
  },
  {
    name: "isDefault",
    field: "isDefault",
    label: "Domyślny",
    align: "center",
  },
  {
    name: "delete",
    field: "delete",
    label: "Usun",
    align: "center",
  },
];

const emit = defineEmits<{
  (e: "refreshData"): void;
}>();

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
