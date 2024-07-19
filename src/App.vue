<template>
  <Header/>
  <div class="container">
    <Balance :total="total"/>
    <IncomExpenses :income="+income" :expenses="+expenses"/>
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmited="handleTransactionSubmited"/>
  </div>
</template>

<script setup>
  import Header from "@/components/Header.vue"
  import Balance from "@/components/Balance.vue"
  import IncomExpenses from "@/components/IncomExpenses.vue"
  import TransactionList from "@/components/TransacttionList.vue"
  import AddTransaction from "@/components/AddTransaction.vue"
  import { computed, onMounted, ref } from "vue"
  import { useToast } from "vue-toastification"

  const toast=useToast()

  const transactions=ref([])
  onMounted(()=>{
    const savedTransaction=JSON.parse(localStorage.getItem("transactions"))
    if (savedTransaction) {
      transactions.value=savedTransaction
    }
  })
const total=computed(()=>{
  return transactions.value.reduce((acc,transaction)=>{
     return acc + transaction.amount
  },0)
})

const income=computed(()=>{
  return transactions.value.filter((transaction)=>transaction.amount > 0).reduce((acc,transaction)=>{
    return acc + transaction.amount
  },0).toFixed(2)
})

const expenses=computed(()=>{
  return transactions.value.filter((transaction)=>transaction.amount < 0).reduce((acc,transaction)=>{
    return acc + transaction.amount
  },0).toFixed(2)
})
const handleTransactionSubmited=(transactionData)=>{
//   if (transactions.value || transactions.value) {
//   toast.success("Transaction Added")
//   return;
// }
 transactions.value.push({
  id:generateUniqueId(),
  text:transactionData.text,
  amount:transactionData.amount
 })
 toast.success("Transaction Added")
 console.log(generateUniqueId());
 saveTransactionToLocalStorage()
}
const generateUniqueId=()=>{
  return Math.floor(Math.random() * 1000000)
}
const handleTransactionDeleted=(id)=>{
transactions.value=transactions.value.filter((transaction)=>transaction.id !==id)
toast.success("Transaction Deleted")
saveTransactionToLocalStorage()
}

const saveTransactionToLocalStorage=()=>{
  localStorage.setItem("transactions",JSON.stringify(transactions.value))
}
</script>

<style lang="scss" scoped>

</style>