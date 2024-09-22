<template>
    <div class="wrapper">
        <h1 class="title">Gerenciar CDs</h1>
        <div class="cd-list">
            <ul class="cd-items">
                <li v-for="cd in cds" :key="cd.id" class="cd-item">
                    <div class="cd-infos">
                        <span class="cd-info">{{ cd.title }} - {{ cd.artist }} - ${{ cd.price }} </span>
                        <span class="cd-info">Quantidade em estoque: {{ cd.stock }} </span>
                    </div>
                    <div class="cd-actions">
                        <button @click="editCD(cd)" class="edit-button">Editar</button>
                        <button @click="deleteCD(cd.id)" class="delete-button">Excluir</button>
                    </div>
                </li>
            </ul>
            <button @click="showCreateForm = true" class="create-button">Criar Novo CD</button>
            <form v-if="showCreateForm" @submit.prevent="createCD" class="create-form">
                <input v-model="newCD.title" placeholder="Título" required class="input-field" />
                <input v-model="newCD.artist" placeholder="Artista" required class="input-field" />
                <input v-model.number="newCD.price" type="number" placeholder="Preço" required class="input-field" />
                <input v-model.number="newCD.stock" type="number" placeholder="Quantidade em Estoque" required class="input-field" />
                <button type="submit" class="submit-button">Adicionar CD</button>
                <button @click="showCreateForm = false" type="button" class="cancel-button">Cancelar</button>
            </form>
            <form v-if="showEditForm" @submit.prevent="updateCD" class="edit-form">
                <input v-model="editingCD.title" placeholder="Título" required class="input-field" />
                <input v-model="editingCD.artist" placeholder="Artista" required class="input-field" />
                <input v-model.number="editingCD.price" type="number" placeholder="Preço" required class="input-field" />
                <input v-model.number="editingCD.stock" type="number" placeholder="Quantidade em Estoque" required class="input-field" />
                <button type="submit" class="submit-button">Salvar Alterações</button>
                <button @click="showEditForm = false" type="button" class="cancel-button">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cds: [],
            showCreateForm: false,
            showEditForm: false,
            newCD: {
                title: '',
                artist: '',
                price: null,
                stock: null,
            },
            editingCD: null, 
        };
    },
    async created() {
        await this.fetchCDs();
    },
    methods: {
        async fetchCDs() {
            try {
                const response = await fetch('http://localhost:3000/cds', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Falha ao buscar CDs');
                }
                const result = await response.json();
                this.cds = result.data;
            } catch (error) {
                console.error(error);
                alert('Erro ao carregar a lista de CDs. Tente novamente mais tarde.');
            }
        },
        async createCD() {
            try {
                const response = await fetch('http://localhost:3000/cds', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(this.newCD),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('CD criado com sucesso!');
                    this.showCreateForm = false;
                    this.newCD = { title: '', artist: '', price: null, stock: null };
                    await this.fetchCDs();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao criar CD. Tente novamente mais tarde.');
            }
        },
        async editCD(cd) {
            this.editingCD = { ...cd }; 
            this.showEditForm = true; 
        },
        async updateCD() {
            try {
                const response = await fetch(`http://localhost:3000/cds/${this.editingCD.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(this.editingCD),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('CD atualizado com sucesso!');
                    this.showEditForm = false; 
                    this.editingCD = null; 
                    await this.fetchCDs(); 
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao atualizar CD. Tente novamente mais tarde.');
            }
        },
        async deleteCD(cdId) {
            if (confirm('Você tem certeza que deseja excluir este CD?')) {
                try {
                    const response = await fetch(`http://localhost:3000/cds/${cdId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                    });

                    if (response.ok) {
                        alert('CD excluído com sucesso!');
                        await this.fetchCDs();
                    } else {
                        const data = await response.json();
                        alert(data.message);
                    }
                } catch (error) {
                    console.error(error);
                    alert('Erro ao excluir CD. Tente novamente mais tarde.');
                }
            }
        },
    },
};
</script>

<style scoped>
.wrapper {
    background-color: #955925;
    color: #F0E2E7;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 80%;
}

.cd-list {
    margin-top: 1rem;
    border-radius: 8px;
    background-color: #33352B;
    padding: 1rem;
}

.title {
    text-align: center;
    margin-bottom: 1.5rem;
}

.cd-items {
    list-style-type: none;
    padding: 0;
}

.cd-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid #B29A8C;
    transition: background-color 0.2s;
}

.cd-item:hover {
    background-color: #735342;
}

.cd-infos {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.cd-actions {
    display: flex;
    gap: 0.5rem;
}

.edit-button,
.delete-button,
.create-button,
.submit-button,
.cancel-button {
    background-color: #D5A021;
    color: #F0E2E7;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.edit-button:hover,
.delete-button:hover,
.create-button:hover,
.submit-button:hover,
.cancel-button:hover {
    background-color: #955925;
}

.create-form,
.edit-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.input-field {
    padding: 0.5rem;
    border: 1px solid #B29A8C;
    border-radius: 4px;
    background-color: #F0E2E7;
    color: #000;
}

.input-field:focus {
    outline: none;
    border-color: #B29A8C;
}
</style>
