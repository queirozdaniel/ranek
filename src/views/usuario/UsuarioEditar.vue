<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar informações</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "./UsuarioForm";
import { api } from "../../services";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm
  },
  methods: {
    atualizarUsuario() {
      api
        .put(
          `/usuario/${this.$store.state.usuario.id}`,
          this.$store.state.usuario
        )
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.btn {
  grid: 2;
}
</style>