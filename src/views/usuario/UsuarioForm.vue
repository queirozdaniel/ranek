<template>
  <form>
    <label for="nome">Nome</label>
    <input type="text" name="nome" id="nome" v-model="nome" />

    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="email" />

    <label for="senha">Senha</label>
    <input type="password" name="senha" id="senha" v-model="senha" />
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="preencherCep" />
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="rua" />
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="numero" />
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="bairro" />
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="cidade" />
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="estado" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "../../helpers";
import { getCep } from "../../services";

export default {
  name: "UsuarioFrom",
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "cep",
        "rua",
        "numero",
        "bairro",
        "cidade",
        "estado"
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    })
  },
  methods: {
    preencherCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then(response => {
          console.log(response.data);
          this.rua = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.cidade = response.data.localidade;
          this.estado = response.data.uf;
        });
      }
    }
  }
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>