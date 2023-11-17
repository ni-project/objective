<template>
    <table class="table">
        <thead>
        <tr>
            <template v-for="(item, index) in tableHead" :key="index">

                <td v-if="index !== 0">
                    <div class="table_caption" @click="handleClickSort(index)">
                        {{ item.title }}
                    </div>

                    <div class="table_sort" @click="handleClickSort(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 6 5" fill="none">
                            <path d="M3.43301 4.25L5.16506 1.25C5.35751 0.916667 5.11695 0.5 4.73205 0.5H1.26795C0.883049 0.5 0.642486 0.916666 0.834936 1.25L2.56699 4.25C2.75944 4.58333 3.24056 4.58333 3.43301 4.25Z" stroke="#29277D" stroke-linejoin="round" opacity="0.3"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 6 5" fill="none">
                            <path d="M3.43301 4.25L5.16506 1.25C5.35751 0.916667 5.11695 0.5 4.73205 0.5H1.26795C0.883049 0.5 0.642486 0.916666 0.834936 1.25L2.56699 4.25C2.75944 4.58333 3.24056 4.58333 3.43301 4.25Z" stroke="#29277D" stroke-linejoin="round" opacity="0.3"/>
                        </svg>
                    </div>
                </td>

            </template>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(data, index) in tableBody" :key="index">

            <template v-for="(item, index) in data" :key="item.id">

                <td v-if="index !== 'id'">
                    {{ index === 'deadline' ? getDate(item) : item }}
                </td>

            </template>

        </tr>
        </tbody>
    </table>
</template>

<script>
    import {dataHead, dataBody} from '@/data/table'

    export default {
        name: 'CustomTable',

        data() {
            return {
                tableHead: dataHead,
                tableBody: dataBody
            }
        },

        methods: {
            handleClickSort(index) {
                const objectKey = Object.keys(this.tableBody[0])[index];

                this.tableBody.sort((a, b) => {
                    if ( typeof a[objectKey] === 'number' ) {

                        if ( this.tableHead[index].sort ) {
                            return b[objectKey] - a[objectKey]
                        } else {
                            return a[objectKey] - b[objectKey]
                        }

                    } else {

                        if ( this.tableHead[index].sort ) {
                            if (a[objectKey] < b[objectKey]) return 1;
                            else if (a[objectKey] > b[objectKey]) return -1;
                            else return 0;
                        } else {
                            if (a[objectKey] > b[objectKey]) return 1;
                            else if (a[objectKey] < b[objectKey]) return -1;
                            else return 0;
                        }

                    }
                });

                this.tableHead[index].sort = !this.tableHead[index].sort;
            },

            getDate(data) {
                const date = new Date(data);
                const day = this.dateTimeHelper(date.getDate());
                const month = this.dateTimeHelper(date.getMonth() + 1);
                const year = date.getFullYear();
                const hour = this.dateTimeHelper(date.getHours());
                const minutes = this.dateTimeHelper(date.getMinutes());

                return `${day}/${month}/${year} в ${hour}:${minutes}`
            },

            dateTimeHelper(data) {
                return data < 10 ? `0${data}` : data;
            }
        }
    }
</script>

<style lang="scss" scoped>
    $tableBorder: 1px;
    $tableHeight: 600px;
    $tableHead: 60px;
    $tableBodyHeight: $tableHeight - $tableHead - ($tableBorder * 2);

    $tableBorderColor: #29277d;

    table {
        display: block;
        width: 100%;
        empty-cells: show;
        border-spacing: 0;
        border: $tableBorder solid $tableBorderColor;

        tr {
            display: flex;
            width: 100%;
        }

        td {
            flex-basis: 100%;
            flex-grow: 2;
            padding: 0 16px;
        }

        thead {
            display: block;
            width: 100%;
            background: #d9eef8;
            overflow-y: scroll;
            position: relative;
            scrollbar-width: thin;
            scrollbar-color: #f5f5f5 #ffffff;

            tr {
                height: $tableHead;

                td {
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    position: relative;
                }

            }

            &::-webkit-scrollbar {
                width: 6px;

                &-thumb {
                    background: rgba(41, 39, 125, 0.40);
                    border-radius: 100px;
                }
            }
        }

        tbody {
            display: block;
            width: 100%;
            max-height: $tableBodyHeight;
            overflow-y: scroll;
            border-top: 1px solid #e8e8e8;
            position: relative;
            scrollbar-width: thin;
            scrollbar-color: #f5f5f5 #ffffff;

            &::-webkit-scrollbar {
                width: 6px;

                &-thumb {
                    background: rgba(41, 39, 125, 0.40);
                    border-radius: 100px;
                }
            }

            tr {
                border-top: 1px solid #e8e8e8;

                &:nth-child(2n){
                    background-color: #faf9f9;
                }

                td {
                    padding: 14px 16px;
                    color: #909090;
                }
            }
        }
    }

    .table {
        &_caption {
            color: #29277d;
            user-select: none;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                color: #5F88F4;
            }
        }

        &_sort {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 16px;
            height: 100%;
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;

            &:hover {
                svg path {
                    fill: #29277d;
                }
            }

            svg {
                path {
                    transition: 0.2s;
                    fill: transparent;
                }

                &:first-child {
                    transform: rotateX(180deg);
                }
            }
        }
    }
</style>
