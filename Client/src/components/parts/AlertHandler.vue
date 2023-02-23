<template>
    <v-alert :value="alert" :title="title" shaped :type="type"  dark border="top" border-color="primary" icon="mdi-account-alert" transition="scale-transition">
        {{ this.text }}
    </v-alert>
</template>

<script>
export default{
    name: 'Alert',
    props:{
        title: String,
        type: String,
        text: String
    }
}
</script>