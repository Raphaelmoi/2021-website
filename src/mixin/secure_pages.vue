<template></template>

<script>
const axios = require("axios");

export default {
  name: "secure_pages",
  components: {},
  data() {
    return {};
  },

  methods: {
    uservalidation() {
      this.$store.state.waitingLogInResult = true;
      var key = this.$store.state.ws_key;
      if (key === null) {
        if (sessionStorage.getItem("tok")) {
          this.$store.state.ws_key = sessionStorage.getItem("tok");
          key = this.$store.state.ws_key;
        }
      }
      if (key) {
        let req = this.$store.state.phpLink + "?action=validate_key";

        let formData = new FormData();
        formData.append("key", JSON.stringify(key));

        axios
          .post(req, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data && response.data === "good") {
              this.$store.state.waitingLogInResult = false;
            } else {
              this.$router.push({ name: "logIn" });
              this.$store.state.message =
                "Vous devez être connecté pour accéder à cette page.";
            }
          })
          .catch(function (error) {
            this.$router.push({ name: "logIn" });
            console.log(error);
          });
      } else {
        this.$router.push({ name: "logIn" });
      }
    },
  },
};
</script>

