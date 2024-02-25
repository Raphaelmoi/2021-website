<template>
  <section class="myBody">
    <div class="giantCircle">
      <div class="centerCircle">
        <router-link to="/" class="navItem backBtn retourBtn">
          <i class="fas fa-arrow-circle-left backFa"></i>
          Retour
        </router-link>

        <router-link to="/newImage" class="navItem item1"
          >Ajouter des images</router-link
        >
        <router-link to="/AllImages" class="navItem item2"
          >Voir les images</router-link
        >
        <router-link to="/newImage" class="noclick navItem item3"
          >Nouvel article</router-link
        >
        <router-link to="/newImage" class="noclick navItem item4"
          >Voir les articles</router-link
        >
        <div>
          <a
            class="noclick navItem item5"
            href="http://localhost/SITE EN LIGNE/src/php/index.php"
            >Lien vers php</a
          >
        </div>
        <router-link to="/newImage" class="noclick navItem item6"
          >autre ...</router-link
        >
        <router-link to="/newImage" class="noclick navItem item7"
          >autre ...</router-link
        >
        <router-link to="/newImage" class="noclick navItem item8"
          >sqsq8 ...</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR0"
          >item r 0</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR1"
          >item r 1</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR2"
          >item r 2</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR3"
          >item r 3</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR4"
          >item r 4.</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR5"
          >item r 5</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR6"
          >item r 6</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR7"
          >item r 7</router-link
        >
        <router-link to="/newImage" class="noclick navItem right itemR8"
          >Settings</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import secure_pages from "@/mixin/secure_pages.vue";

export default {
  name: "App",

  data() {
    return {};
  },
  mixins: [secure_pages],
  created() {
    this.uservalidation();
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
