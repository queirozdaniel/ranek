<template>
  <section>
    <h2>Crie a sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
      <UsuarioFrom v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">Criar usuário</button>
      </UsuarioFrom>
    </transition>
  </section>
</template>

<script>
import UsuarioFrom from "../views/usuario/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: {
    UsuarioFrom
  },
  data() {
    return {
      criar: false
    };
  },
  methods: {
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "getUsuario",
          this.$store.state.usuario.email
        );
        this.$router.push({ name: "usuario" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 40px 0 10px 0;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.btn-form {
  max-width: 100%;
}
</style>