<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <ProdutosAdicionar />
    <h2>Seus Produtos</h2>

    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">
          <p>{{produto.descricao}}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">Excluir</button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutosAdicionar from "../../components/ProdutosAdicionar";
import ProdutoItem from "../../components/ProdutoItem";
import { mapState, mapActions } from "vuex";
import { api } from "../../services";

export default {
  name: "UsuarioProdutos",
  components: {
    ProdutosAdicionar,
    ProdutoItem
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"])
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id) {
      const confirmar = window.confirm("Deseja remover este produto ?");
      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUsuarioProdutos();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  watch: {
    login() {
      this.getUsuarioProdutos();
    }
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0;
  right: 0;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  overflow: hidden;
  text-indent: -100px;
  border: none;
}
.deletar:hover {
  color: #84f;
}
</style>