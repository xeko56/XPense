<template>
    <div class="expenseList">
        <div class="relative">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tr v-for="(expense, index) in expenses" :key="index">
                    <template v-if="isEditing === expense.id">
                        <!-- Editable input fields for the expense being edited -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <input v-model="expense.date" type="date"
                                class="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <input v-model="expense.description" type="text"
                                class="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <input v-model="expense.amount" type="number"
                                class="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap flex items-center">
                            <button @click="saveExpense(expense)"
                                class="text-indigo-600 hover:text-indigo-700 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                </svg>


                            </button>
                            <button @click="cancelExpense(expense)"
                                class="text-red-600 hover:text-red-900 ml-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>


                            </button>
                        </td>
                    </template>
                    <template v-else>
                        <!-- Read-only fields for expenses not being edited -->
                        <td class="px-6 py-4 whitespace-nowrap">{{ expense.date }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ expense.description }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ expense.amount }}</td>
                        <td class="px-6 py-4 whitespace-nowrap flex items-center">
                            <button @click="editExpense(expense)"
                                class="text-indigo-600 hover:text-indigo-900 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button @click="promptDelete(expense)"
                                class="text-red-600 hover:text-red-900 ml-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </td>
                    </template>
                </tr>
            </table>
            <button @click="showModal = true"
                class="absolute top-0 right-0 mt-2 mr-2 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

            </button>
            <ModalComponent v-if="showModal" @save="addExpense" @cancel="cancelAddExpense"/>
            <Alert v-if="showDeleteConfirm" :title="'Warning'" :desc="'Are you sure to delete this entry?'" :btntext="'Delete'"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ModalComponent from './ModalComponent.vue'
import Alert from './Alert.vue'

// Dummy expenses data (replace with your storage implementation)
const expenses = ref([
    { date: '2024-05-01', description: 'Groceries', amount: 50 },
    { date: '2024-05-02', description: 'Utilities', amount: 100 },
    { date: '2024-05-03', description: 'Dining Out', amount: 30 },
    // Add more expenses as needed
]);

const isEditing = ref(null);
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const currentExpense = ref(null);

onMounted(async () => {
    const retrievedExpenses = await getAllExpenses();
    expenses.value = retrievedExpenses ?? expenses;
    console.log(expenses);
});

async function getLastId() {
    const db = await openDatabase();
    const transaction = db.transaction(['expenses'], 'readonly');
    const store = transaction.objectStore('expenses');
    const allKeys = await store.getAllKeys();
    return allKeys.length > 0 ? Math.max(...allKeys) : 0;
}

function generateId() {
    return Date.now();
}

const addExpense = async (expense) => {
    console.log("test", expense);
    const newId = generateId();
    saveExpense({id: newId, ...expense});
    showModal.value = false;
}

const cancelAddExpense = () => {
    showModal.value = false;
}

const editExpense = (expense) => {
    // Implement edit functionality
    console.log('Edit expense:', expense);
    isEditing.value = expense.id;
};

const cancelExpense = (expense) => {
    // Implement delete functionality
    console.log('Cancel expense:', expense);
    isEditing.value = null;
};

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ExpensesDB', 1);

        request.onupgradeneeded = function (event) {
            // Create an object store called "expenses" when the database is created
            const db = event.target.result;
            db.createObjectStore('expenses', { keyPath: 'id' });
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject('Database error: ' + event.target.errorCode);
        };
    });
}

// Adding or updating an expense
async function saveExpense(expense) {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(['expenses'], 'readwrite');
        const store = transaction.objectStore('expenses');

        const cleanExpense = JSON.parse(JSON.stringify({
            id: expense.id,
            date: expense.date,
            description: expense.description,
            amount: expense.amount
        }));

        const response = await store.put(cleanExpense); // 'put' adds or updates an object in the store
        console.log('Save expense:', cleanExpense);

        // Now update local state to reflect the saved data
        const index = expenses.value.findIndex(e => e.id === expense.id);
        if (index !== -1) {
            expenses.value[index] = { ...expense };
        } else {
            expenses.value.push(expense);
        }

        isEditing.value = null;
    } catch (error) {
        console.error('Failed to save the expense:', error);
    }
}

// Retrieving all expenses
async function getAllExpenses() {
    const db = await openDatabase();
    const transaction = db.transaction(['expenses'], 'readonly');
    const store = transaction.objectStore('expenses');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Error fetching expenses');
    });
}

const promptDelete = (expense) => {
    currentExpense.value = expense;
    showDeleteConfirm.value = true;
};

// Deleting an expense
async function deleteExpense(id) {
    const db = await openDatabase();
    const transaction = db.transaction(['expenses'], 'readwrite');
    const store = transaction.objectStore('expenses');
    store.delete(id);
}
</script>

<style scoped>
/* Add any additional styles here */
</style>