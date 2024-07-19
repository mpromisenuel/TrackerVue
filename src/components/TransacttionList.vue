<template>
     <h3>History</h3>
      <ul id="list" class="list">
        <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus':'plus'">
          {{transaction.text}} <span>${{transaction.amount}}</span><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
        </li>
        
      </ul>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  transactions:Array
})
const emit=defineEmits(["transactionDeleted"])

const deleteTransaction=(id)=>{
 emit("transactionDeleted",id)
}
// import { ref } from 'vue';
// import dataTransaction from "@/transaction.json"
// const transactions=ref(dataTransaction)
</script>