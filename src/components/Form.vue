<template>
  <div>
    <q-input filled v-model="nick" label="Nick:" />
    <q-input filled v-model="firstName" label="Imię:" />
    <q-input filled v-model="lastName" label="Nazwisko:" />
    <q-input filled v-model="telephone" label="Numer Telefonu:" />
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { adressBookService } from "@/services/adressBookService";

const { addEntry } = adressBookService();

const nick = ref<string>();
const firstName = ref<string>();
const lastName = ref<string>();
const telephone = ref<string>();
const email = ref<string>();
const adress = ref<string>();
const city = ref<string>();
const postalCode = ref<string>();
const emit = defineEmits<{
  (e: "added"): void;
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
  await addEntry({
    firstName: firstName.value,
    lastName: lastName.value,
    nick: nick.value,
    telephone: telephone.value,
    email: email.value,
    adress: adress.value,
    city: city.value,
    postalCode: postalCode.value,
  });
  emit("added");
}
</script>

<style lang="scss" scoped></style>
