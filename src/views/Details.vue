<template>
  <div class="q-pa-md column" style="max-width: 100%">
    <div class="q-gutter-y-md self-center" style="min-width: 30%">
      <h2 style="text-align: center">{{ firstName }} {{ lastName }}</h2>
      <q-input filled v-model="nick" label="Login:" :disable="isEdited" />
      <q-input filled v-model="firstName" label="Imię:" :disable="isEdited" />
      <q-input
        filled
        v-model="lastName"
        label="Nazwisko:"
        :disable="isEdited"
      />
<<<<<<< HEAD
      <q-table
        flat
        bordered
        title="Numery Telefonu"
        :rows="numberPhones"
        :columns="columns"
        row-key="name"
        items-center
      >
        <template v-slot:top-right>
          <q-btn color="green" icon="add" @click="" :disable="isEdited">
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
              :disable="isEdited"
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
              :disable="isEdited"
              @click="setDefault(scope.row.number)"
            />

            <!-- <q-toggle v-model="scope.row.isDefault" /> -->
          </q-td>
        </template>

        <q-td auto-width> </q-td>
      </q-table>

=======
      <q-input
        filled
        v-model="numberPhones[0].number"
        label="Telefon:"
        :disable="isEdited"
      />
>>>>>>> bebed691304b941b8fc6eea5e5a1894bdb4bf4fb
      <q-input filled v-model="email" label="Email:" :disable="isEdited" />
      <q-input filled v-model="address" label="Adres:" :disable="isEdited" />
      <q-input filled v-model="city" label="Miasto:" :disable="isEdited" />
      <q-input
        filled
        v-model="postalCode"
        label="Kod Pocztowy:"
        :disable="isEdited"
      />
    </div>

    <div
      class="q-pa-md q-gutter-y-md column self-center"
      style="max-width: 50%"
    >
      <q-btn-group>
        <q-btn color="yellow" icon="edit" text-color="black" @click="setEdit" />
        <q-btn
          color="red"
          icon="delete"
          text-color="black"
          @click="Delete(id)"
        />
        <q-btn
          color="orange"
          icon="keyboard_return"
          text-color="black"
          @click="goBack"
        />
      </q-btn-group>

      <q-btn-group class="self-center">
        <q-btn
          color="green"
          icon="check"
          text-color="black"
          @click="Edit"
          :disable="isEdited"
        />
        <q-btn
          color="red"
          icon="undo"
          text-color="black"
          :disable="isEdited"
          @click="reset"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from "vue";

import { useRouter } from "vue-router";
import {
  Entry,
  PhoneNumber,
  Status,
  adressBookService,
} from "@/services/adressBookService";
const { getEntry, deleteEntry, editEntry } = adressBookService();

import { QTableColumn, useQuasar } from "quasar";
const $q = useQuasar();

const router = useRouter();

const id = ref<number>(0);
const nick = ref<String>("");
const firstName = ref<String>("");
const lastName = ref<String>("");
const numberPhones = ref<PhoneNumber[]>([]);
const email = ref<String>("");
const address = ref<String>("");
const city = ref<String>("");
const postalCode = ref<String>("");
const entry = ref<Entry>();
const phoneNumber = ref<string>("");
const isDefault = ref<string>("");
const addNumberMenuShow = ref<boolean>(false);

const isEdited: Ref<boolean> = ref(true);

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

async function deleteEntryRow(number: string) {
  numberPhones.value = numberPhones.value.filter((x) => x.number !== number);
}
async function Edit() {
  const editStatus: Status = await editEntry(
    id.value,
    nick.value,
    firstName.value,
    lastName.value,
    numberPhones.value,
    email.value,
    address.value,
    city.value,
    postalCode.value
  );

  entry.value = {
    id: id.value,
    nick: nick.value,
    firstName: firstName.value,
    lastName: lastName.value,
    numberPhones: numberPhones.value,
    email: email.value,
    address: address.value,
    city: city.value,
    postalCode: postalCode.value,
  };

  switch (editStatus.status) {
    case 200:
      reset();
      $q.notify({
        message: "Edytowano wpis.",
        color: "green",
      });
      break;

    case 400:
      $q.notify({
        message: editStatus.message as string,
        color: "red",
      });
      break;

    default:
      break;
  }
  entry.value = await getEntry(props.entryId);
}

async function reset() {
  if (entry.value) {
    id.value = entry.value.id;
    nick.value = entry.value.nick;
    firstName.value = entry.value.firstName;
    lastName.value = entry.value.lastName;
    numberPhones.value = entry.value.numberPhones;
    email.value = entry.value.email;
    address.value = entry.value.address;
    city.value = entry.value.city;
    postalCode.value = entry.value.postalCode;
    isEdited.value = true;
  }
}

function setEdit() {
  isEdited.value = !isEdited.value;
}

function goBack() {
  router.push({
    name: "home",
  });
}

async function Delete(id: number) {
  const isDeleted: boolean = await deleteEntry(id);
  if (isDeleted) {
    router.push({
      name: "home",
    });
    $q.notify({
      message: "Usunięto wpis",
      color: "green",
    });
  }
}

const props = defineProps({
  entryId: {
    type: String,
    required: true,
    default: 0,
  },
});

onMounted(async () => {
  entry.value = await getEntry(props.entryId);
  if (entry.value) {
    id.value = entry.value.id;
    nick.value = entry.value.nick;
    firstName.value = entry.value.firstName;
    lastName.value = entry.value.lastName;
    numberPhones.value = entry.value.numberPhones;
<<<<<<< HEAD
    isDefault.value =
      entry.value.numberPhones.find((x) => x.isDefault == true)?.number || "";
=======
>>>>>>> bebed691304b941b8fc6eea5e5a1894bdb4bf4fb
    email.value = entry.value.email;
    address.value = entry.value.address;
    city.value = entry.value.city;
    postalCode.value = entry.value.postalCode;
  }
});

function setDefault(number: string) {
  for (const element of numberPhones.value) {
    if (element.number === number) {
      element.isDefault = true;
      continue;
    }
    element.isDefault = false;
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
    numberPhones.value.find((x) => x.number === phoneNumber.value) != undefined
  ) {
    $q.notify({
      message: "Taki numer już istnieje!",
      color: "red",
    });
    resetNumber();
    return;
  }

  numberPhones.value.push({
    number: phoneNumber.value,
    isDefault: false,
  });

  if (numberPhones.value.length === 1) {
    const firstPhoneNumber = numberPhones.value[0];
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
