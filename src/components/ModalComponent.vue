<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg">
            <h2 class="text-lg font-bold mb-6">Add New Expense</h2>
            <form @submit.prevent="submit">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" v-model="newExpense.date"
                        class="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" v-model="newExpense.description"
                        class="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Amount ($)</label>
                    <input type="number" v-model="newExpense.amount"
                        class="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>
                <div class="flex justify-center">
                    <button type="button" @click="cancel"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Cancel
                    </button>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const newExpense = ref({
    date: '',
    description: '',
    amount: null
});

const emit = defineEmits(['save', 'cancel']);

function submit() {
    emit('save', { ...newExpense.value });
    newExpense.value = { date: '', description: '', amount: null };
}

function cancel() {
    emit('cancel');
    newExpense.value = { date: '', description: '', amount: null };
}
</script>