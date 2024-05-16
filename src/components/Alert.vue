<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white p-4 rounded-lg shadow-lg">
            <h2 v-if="title" class="text-lg font-bold">{{ title }}</h2>
            <p v-if="desc">{{ desc }}</p>
            <div class="mt-4 flex justify-end space-x-2">
                <button v-if="btntext" @click="$emit('confirm')"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    {{ btntext }}
                </button>
                <button v-if="showCancel" @click="$emit('cancel')"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    desc: String,
    btntext: String,
    showCancel: {
        type: Boolean,
        default: true
    }
});

</script>