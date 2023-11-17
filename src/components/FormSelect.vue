<template>
    <div :class="['form-select', isOpened ? 'isOpened' : '', label.length ? 'isSelected' : '']" tabindex="0" @blur="handleBlurSelect">
        <div class="form-select_wrapper">
            <div class="form-select_label">

                <label>{{ label }}</label>

                <div class="form-select_placeholder">
                    <span>Выберите пункт</span>
                </div>

                <div class="form-select_button" @click="handleClickSelectButton">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6L8 11L13 6" stroke="#BBC3FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

            </div>

            <div class="form-select_dropdown">
                <div class="form-select_dropdown-items">

                    <div v-for="option in options" :key="option.id" class="form-select_dropdown-item" @click="handleClickSelectOption(option.title)">
                        {{ option.title }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormSelect',

        props: {
            options: {
                type: Array
            },

            selected: {
                type: Number
            }
        },

        data() {
            return {
                label: '',
                isOpened: false,
            }
        },

        mounted() {
            if (typeof (this.selected) !== 'undefined') {
                const optionsCount = this.options.length;
                const index = this.selected;

                if (index < optionsCount) {
                    this.label = this.options[index].title;

                    this.selectOnChange(this.label);
                }
            }
        },

        methods: {
            handleClickSelectButton() {
                this.isOpened = !this.isOpened
            },

            handleClickSelectOption(selectLabel) {
                this.label = selectLabel;
                this.isOpened = false;

                this.selectOnChange(this.label);
            },

            selectOnChange(data) {
                this.$emit('selectOnChange', {
                    selectLabel: data
                });
            },

            handleBlurSelect() {
                this.isOpened = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    $selectFontColor: #29277d;
    $selectBorderColor: #F968bf;
    $selectOptionBackgroundHover: #DADEFE;
    $selectPlaceholderColor: rgba(41, 39, 125, 0.40);
    $selectArrowColor: #5F88F4;

    $selectOpenSpeed: 0.15s;

    $selectHeight: 32px;
    $selectBorder: 1px;
    $labelHeight: $selectHeight - ($selectBorder * 2);
    $selectButtonWidth: 24px;
    $selectDropdownMaxHeight: 119px;

    .form-select {
        $this: &;

        display: block;
        width: 100%;
        height: $selectHeight;
        user-select: none;
        position: relative;

        &.isOpened {
            #{$this} {
                &_wrapper {
                    border: $selectBorder solid $selectBorderColor;
                    box-shadow: none;
                }

                &_dropdown {
                    max-height: $selectDropdownMaxHeight;

                    &-items {
                        border-top: $selectBorder solid $selectBorderColor;
                    }
                }

                &_button {
                    svg {
                        transform: rotateX(180deg);

                        path {
                            stroke: #5F88F4;
                        }
                    }
                }
            }
        }

        &.isSelected {
            #{$this} {
                &_placeholder {
                    padding: 0 6px;
                    transform: translateY(-8px);
                }
            }
        }

        &_wrapper {
            display: block;
            width: 100%;
            border: $selectBorder solid transparent;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(41, 39, 125, 0.1);
            transition: $selectOpenSpeed;
        }

        &_label {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            height: $labelHeight;
            padding-left: 12px;

            label {
                display: block;
                width: calc(100% - (#{$selectButtonWidth} / 2));
                font-size: 12px;
                line-height: 16px;
                color: $selectFontColor;
                font-weight: 400;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        &_placeholder {
            display: block;
            width: 100%;
            padding: 0 10px;
            font-size: 12px;
            line-height: 16px;
            color: $selectPlaceholderColor;
            font-weight: 400;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transform: translateY(8px);
            transition: $selectOpenSpeed;
            position: absolute;
            left: 0;
            top: 0;

            span {
                padding: 0 2px;
                background: #ffffff;
            }
        }

        &_button {
            display: flex;
            align-items: center;
            width: $selectButtonWidth;
            height: $labelHeight;
            position: relative;
            cursor: pointer;

            svg {
                transform: rotateX(0deg);
                transition: $selectOpenSpeed;

                path {
                    stroke: $selectOptionBackgroundHover;
                    transition: $selectOpenSpeed;
                }
            }
        }

        &_dropdown {
            display: block;
            width: 100%;
            max-height: 0;
            background: #ffffff;
            overflow: hidden;
            border-radius: 0 0 8px 8px;
            transition: $selectOpenSpeed ease-out;
            position: relative;
            z-index: 3;

            &-items {
                display: block;
                width: 100%;
                max-height: $selectDropdownMaxHeight;
                padding-top: 8px;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: $selectPlaceholderColor #ffffff;
                border-top: $selectBorder solid transparent;
                transition: $selectOpenSpeed border-top;

                &::-webkit-scrollbar {
                    width: 6px;

                    &-thumb {
                        background: $selectPlaceholderColor;
                        border-radius: 100px;
                    }
                }
            }

            &-item {
                display: block;
                width: 100%;
                padding: 3px 12px;
                font-size: 12px;
                line-height: 16px;
                color: $selectFontColor;
                font-weight: 400;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    background: $selectOptionBackgroundHover;
                }
            }
        }
    }
</style>
