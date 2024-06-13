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
      <q-input
        filled
        v-model="numberPhones[0].number"
        label="Telefon:"
        :disable="isEdited"
      />
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

import { useQuasar } from "quasar";
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

const isEdited: Ref<boolean> = ref(true);

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
    email.value = entry.value.email;
    address.value = entry.value.address;
    city.value = entry.value.city;
    postalCode.value = entry.value.postalCode;
  }
});
</script>

<style lang="scss" scoped></style>
