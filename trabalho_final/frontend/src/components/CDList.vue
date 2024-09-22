<template>
    <div class="wrapper">
        <h1 class="title">Lista de CDs</h1>
        <div class="cd-list">
            <ul class="cd-items">
                <li v-for="cd in cds" :key="cd.id" class="cd-item">
                    <div class="cd-infos">
                        <span class="cd-info">{{ cd.title }} - {{ cd.artist }} - ${{ cd.price }} </span>
                        <span class="cd-info">Quantidade em estoque: {{ cd.stock }} </span>
                    </div>
                    <input type="number" v-model.number="quantities[cd.id]" placeholder="Quantidade"
                        class="quantity-input" min="0" />
                </li>
            </ul>
            <div class="buttons">
                <button @click="goToOrders" class="view-orders-button">Ver Pedidos</button>
                <button @click="createOrder" class="create-order-button">Criar Pedido</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cds: [],
            quantities: {},
        };
    },
    async created() {
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
    methods: {
        async createOrder() {
            const items = Object.keys(this.quantities)
                .filter((id) => this.quantities[id] > 0)
                .map((id) => ({ cdId: id, quantity: this.quantities[id] }));

            if (items.length === 0) {
                alert('Por favor, selecione pelo menos um CD.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ userId: this.$store.state.userId, items: items }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Pedido criado com sucesso!');
                    this.quantities = {}; 
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao criar pedido. Tente novamente mais tarde.');
            }
        },
        goToOrders() {
            this.$router.push('/orders'); 
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

.cd-info {
    flex: 1;
}

.cd-infos {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.quantity-input {
    width: 60px;
    padding: 0.5rem;
    border: 1px solid #B29A8C;
    border-radius: 4px;
    background-color: #F0E2E7; 
    color: #000;
    transition: border-color 0.2s;
}

.quantity-input:focus {
    outline: none;
    border-color: #B29A8C; 
}

.create-order-button {
    background-color: #D5A021; 
    color: #F0E2E7; 
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    margin: 1rem auto;
    transition: background-color 0.2s;
}

.create-order-button:hover {
    background-color: #955925;
}

.view-orders-button {
    background-color: #B29A8C;
    color: #F0E2E7;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    margin: 1rem auto;
    transition: background-color 0.2s;
}

.view-orders-button:hover {
    background-color: #735342;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 1rem; 
}
</style>
