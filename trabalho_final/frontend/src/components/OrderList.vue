<template>
    <div class="wrapper">
        <button @click="goToCDList" class="back-button">Voltar para Lista de CDs</button>
        <h1 class="title">Meus Pedidos</h1>
        <ul class="order-list">
            <li v-for="order in filteredOrders" :key="order.id" class="order-item">
                <div class="order-header" @click="toggleItems(order.id)">
                    <span>Pedido #{{ order.id }} - Total: ${{ order.totalAmount }}</span>
                    <span class="toggle-icon">{{ order.showItems ? '▲' : '▼' }}</span>
                </div>
                <ul v-if="order.showItems" class="order-items">
                    <li v-for="item in order.items" :key="item.id" class="order-item-details">
                        CD: {{ item.cd.title }} - Quantidade: {{ item.quantity }} - Preço: ${{ item.price }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [],
        };
    },
    computed: {
        filteredOrders() {
            return this.orders.filter(order => order.user.id === this.$store.state.userId);
        }
    },
    async created() {
        try {
            const response = await fetch('http://localhost:3000/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const result = await response.json();
            this.orders = result.data.map(order => ({ ...order, showItems: false }));
            console.log(this.orders);
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
        }
    },
    methods: {
        toggleItems(orderId) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.showItems = !order.showItems;
            }
        },
        goToCDList() {
            this.$router.push('/cds'); 
        }
    }
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
    margin: auto;
}

.back-button {
    background-color: #D5A021;
    color: #F0E2E7;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: background-color 0.2s;
}

.back-button:hover {
    background-color: #735342;
}

.title {
    text-align: center;
    margin-bottom: 1.5rem;
}

.order-list {
    list-style-type: none;
    padding: 0;
}

.order-item {
    background-color: #33352B;
    border: 1px solid #B29A8C; 
    border-radius: 5px;
    margin: 0.5rem 0;
    padding: 1rem;
    transition: background-color 0.2s;
}

.order-item:hover {
    background-color: #735342;
}

.order-header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    color: #F0E2E7;
}

.toggle-icon {
    font-weight: bold;
}

.order-items {
    list-style-type: none;
    padding-left: 1rem;
    margin: 0.5rem 0 0 0;
}

.order-item-details {
    background-color: #e9e9e9;
    padding: 0.5rem;
    border-radius: 4px;
    margin: 0.2rem 0;
    color: #000;
}
</style>
