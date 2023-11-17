<template>
    <div class="container">

        <div class="container_select">
            <h2>Task 1 - Select</h2>

            <div class="container_select-group">
                <div>
                    <form-select :options="animals" :selected="8" @selectOnChange="selectOnChange" />
                </div>

                <div>
                    Селект: {{ animalChoose.length ? animalChoose : 'Не выбрано' }}
                </div>
            </div>
        </div>

        <div class="container_table">
            <h2>Task 2 - Таблица</h2>

            <custom-table />
        </div>

    </div>
</template>

<script>
    import {options} from './data/options'
    import FormSelect from './components/FormSelect.vue'
    import CustomTable from './components/CustomTable.vue'

    export default {
        name: 'App',

        components: {
            FormSelect,
            CustomTable
        },

        data() {
            return {
                animals: options,
                animalChoose: '',
            }
        },

        methods: {
            selectOnChange(data) {
                this.animalChoose = data.selectLabel;
            }
        }
    }
</script>

<style lang="scss">
    .container {
        display: block;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;

        &_select, &_table {
            padding: 60px 24px;
        }

        &_select {
            &-description {
                display: block;
                margin-top: 16px;
            }

            &-group {
                display: grid;
                grid-template-columns: 280px 1fr;
                column-gap: 24px;
                align-items: center;
            }
        }
    }
</style>
