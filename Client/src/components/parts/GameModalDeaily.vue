<template>
    <v-row justify="center">
        <v-dialog  v-model="detailModal">
            <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                    <br>
                    {{ showModal }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

export default {
    name: 'Detail Modal',
    props: ['showModal'],

    data: () => ({
        detailModal: true
     }),
}

</script>