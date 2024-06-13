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
            <q-btn color="green" icon="add" @click="">
              <q-menu v-model="addNumberMenuShow">
                <q-input
                  filled
                  v-model="phoneNumber"
                  type="tel"
                  mask="### ### ###"
                  label="Numer Telefonu:"
                />
                <div>
                  <q-btn
                    label="Dodaj"
                    type="submit"
                    color="primary"
                    @click="addNumber()"
                  />
                  <q-btn
                    label="Resetuj"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                    @click="resetNumber()"
                  />
                  <q-btn
                    label="Zamknij"
                    type="close"
                    color="primary"
                    class="q-ml-sm"
                    @click="addNumberMenuShow = false"
                  />
                </div>
              </q-menu>
            </q-btn>
          </template>
          <template #body-cell-delete="scope">
            <q-td auto-width>
              <q-btn
                color="red"
                icon="delete"
                @click.stop="deleteEntryRow(scope.row.number)"
              />
            </q-td>
          </template>

          <template #body-cell-isDefault="scope">
            <q-td auto-width>
              <q-radio
                v-model="isDefault"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="scope.row.number"
                @click="setDefault(scope.row.number)"
              />

              <!-- <q-toggle v-model="scope.row.isDefault" /> -->
            </q-td>
          </template>

          <q-td auto-width> </q-td>
        </q-table>

        <q-input filled type="email" v-model="email" label="Email:" />
        <q-input filled v-model="adress" label="Adres:" />
        <q-input filled v-model="city" label="Miasto:" />
        <q-input
          filled
          v-model="postalCode"
          type="text"
          mask="##-###"
          label="Kod pocztowy:"
        />
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

import { QTableColumn, useQuasar } from "quasar";
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
const isDefault = ref<string>("");
const phoneNumbers = ref<PhoneNumber[]>([]);
const phoneNumber = ref<string>("");
const addNumberMenuShow = ref<boolean>(false);

const columns: QTableColumn[] = [
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
  phoneNumbers.value = [];
}

async function deleteEntryRow(number: string) {
  phoneNumbers.value = phoneNumbers.value.filter((x) => x.number !== number);
}

function setDefault(number: string) {
  for (const element of phoneNumbers.value) {
    if (element.number === number) {
      element.isDefault = true;
      continue;
    }
    element.isDefault = false;
  }
}

async function add() {
  const addStatus: Status = await addEntry({
    firstName: firstName.value,
    lastName: lastName.value,
    nick: nick.value,
    numberPhones: phoneNumbers.value,
    email: email.value,
    address: adress.value,
    city: city.value,
    postalCode: postalCode.value,
  });

  switch (addStatus.status) {
    case 200:
      emit("refreshData");
      reset();
      showDialog.value = false;
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

function addNumber() {
  if (phoneNumber.value === "") {
    $q.notify({
      message: "Musisz podać numer aby go dodać!",
      color: "red",
    });
    return;
  }
  phoneNumber.value = phoneNumber.value.replace(" ", "").replace(" ", "");

  if (phoneNumber.value.length < 9) {
    $q.notify({
      message: "Podano za krótki numer!",
      color: "red",
    });
    return;
  }

  if (phoneNumber.value.length > 10) {
    $q.notify({
      message: "Podano za długi numer!",
      color: "red",
    });
    return;
  }

  if (
    phoneNumbers.value.find((x) => x.number === phoneNumber.value) != undefined
  ) {
    $q.notify({
      message: "Taki numer już istnieje!",
      color: "red",
    });
    resetNumber();
    return;
  }

  phoneNumbers.value.push({
    number: phoneNumber.value,
    isDefault: false,
  });

  if (phoneNumbers.value.length === 1) {
    const firstPhoneNumber = phoneNumbers.value[0];
    isDefault.value = firstPhoneNumber.number;
    firstPhoneNumber.isDefault = true;
  }
  addNumberMenuShow.value = false;
  $q.notify({
    message: "Dodano numer",
    color: "green",
  });
  resetNumber();
}

function resetNumber() {
  phoneNumber.value = "";
}
</script>

<style lang="scss" scoped></style>
