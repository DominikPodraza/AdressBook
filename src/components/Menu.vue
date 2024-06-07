<template>
  <div class="q-pa-md">
    <q-tabs
      class="row justify-center bg-grey"
      dense
      align="center"
      @update:model-value="tab"
    >
      <q-tab class="text-black" name="home" icon="home" label="Główna" />
      <q-tab class="text-black" name="add" icon="add" label="Dodaj kontakt" />
    </q-tabs>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "tabChange", id: string): void;
}>();

function tab(value: string) {
  emit("tabChange", value);
}
</script>

<style lang="scss" scoped></style>
