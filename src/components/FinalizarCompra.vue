<template>
  <section>
    <h2>Endereço de envio</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar compra</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "../views/usuario/UsuarioForm";
import { api } from "../services";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm
  },
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.vendedor_id,
        produto: this.produto,
        enderece: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado
        }
      };
    }
  },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "getUsuario",
          this.$store.state.usuario.email
        );
        await this.criarTransacao();
      } catch (error) {
        console.log(error);
      }
    },
    finalizarCompra() {
      if (this.$store.state.login) {
        this.criarTransacao();
      }
      this.criarUsuario();
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 40px 0 20px;
}

.btn {
  background: #ee8800;
}
</style>