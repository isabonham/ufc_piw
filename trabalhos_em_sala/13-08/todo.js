const { ref, computed, createApp } = Vue

const app = createApp({
  setup() {
    const categorias = ref([
      'Estudo', 'Lazer', 'Trabalho', 'Leitura'
    ])
    
  const tasks = ref([])

  const inputDescription = ref('')
  const selectCategoria = ref('')
  const isEmpty = computed(() => inputDescription.value.length === 0 )

  const nConcluidas = computed(() => tasks.value.filter((item) => item.concluded === false))
  const concluidas = computed(() => tasks.value.filter((item) => item.concluded === true))

  function addTask() {
    tasks.value.push({
      id: tasks.value.length + 1,
      description: inputDescription.value,
      categoria: selectCategoria.value,
      concluded: false
    })
    inputDescription.value = ""
  }

  function remove(id) {
    const pos = tasks.value.find((item) => item.id == id)
    if(pos != -1) {
      tasks.value.splice(pos, 1)
    }
  }
    return {
      tasks, categorias, inputDescription, selectCategoria, isEmpty, concluidas, nConcluidas, addTask, remove
    }
  }
})

app.component('task-list', {
    props: ['description', 'empty', 'tasks'],
    template: `
    <h2> {{ description }} </h2>
    <ul v-if="tasks.length > 0">
      <li v-for="task in tasks" :class="{
        concluded: task.concluded
      }">
        {{ task.description }} - {{ task.categoria }}
        <input type="checkbox" @change="task.concluded = !task.concluded" :checked="task.concluded">
        <button @click="remove(task.id)"> Remover </button>
      </li>
    </ul>
    <p v-else>
      {{ empty }}
    </p>`
    
}).mount('#app')