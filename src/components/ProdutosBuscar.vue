<template>
  <form>
    <input type="text" name="busca" id="busca" v-model="busca" placeholder="Buscar..." />
    <input type="submit" value="Buscar" id="lupa" @click.prevent="buscarProdutos" />
  </form>
</template>

<script>
export default {
  name: "ProdutosBuscar",
  data() {
    return {
      busca: ""
    };
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.busca } });
    }
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:hover,
#busca:focus {
  transform: scale(1.1);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  box-shadow: none;
  top: 0;
  right: 0;
}
</style>