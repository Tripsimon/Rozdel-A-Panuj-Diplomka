<template>
    <v-alert :model-value="modelValue" style="z-index:2000" @update:model-value="emit('update:modelValue', $event)" position="fixed" class="ma-3 " closable :title="title" shaped :type="type"  dark border="top" border-color="primary" transition="scale-transition">
        {{ this.text }}
    </v-alert>
</template>

<script setup>

//Props a import
//Pozn. Tato komponenta byla první přesunuta na Composition API z Options API
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    title: String,
    type: String,
    text: String,
    modelValue: Boolean,
})

</script>