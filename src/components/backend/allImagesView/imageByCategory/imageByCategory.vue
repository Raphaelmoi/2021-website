<style src="./imageByCategory.css" scoped></style>
<template src="./imageByCategory.html"></template>

<script>
import listimgVueComp from "@/components/backend/allImagesView/imageByCategory/listimgVueComp.vue";
import oneImgComp from "@/components/backend/allImagesView/imageByCategory/oneImgComp.vue";
import secure_pages from "@/mixin/secure_pages.vue";

const axios = require("axios");

export default {
  data() {
    return {
      category: 0, //set the kind of view
      currentKeywordDatas: [],
      currentImg: 0,
      settingPanel: false,
      dataToSendToServer: false,
      modifyTitle: false,
      currentView: 0,
    };
  },
  mixins: [secure_pages],
  created() {
    this.uservalidation();
  },
  components: {
    listimgVueComp,
    oneImgComp,
  },
  mounted: function () {
    const id = this.$route.params.id;
    let find = -1;
    for (let i = 0; i < this.$store.state.keywordTable.length; i++) {
      if (this.$store.state.keywordTable[i].keywords === id) {
        find = i;
      }
    }
    this.currentView = find;
  },

  methods: {
    deleteDiaporama() {
      if (
        confirm(
          "Etes vous sur de vouloir supprimer ce diaporama ? Cette action est irréversible"
        )
      ) {
        //rajouter id de toutes les images pour leur soustraire 1 ds champs nbr_utilisation
        let formData = new FormData();
        formData.append(
          "id",
          JSON.stringify(this.$store.state.keywordTable[this.currentView].id)
        );
        formData.append("imageDatas", JSON.stringify(this.imageDatas));
        formData.append("key", JSON.stringify(this.$store.state.ws_key));
        let req = this.$store.state.phpLink + "?action=deleteFullDiaporama";
        axios
          .post(req, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            window.location.href = "/AllImages?msg=" + response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    updateThisDiapo() {
      this.$store.dispatch("updateKeywordsTable");
      this.$store.dispatch("updateImageTable");
      this.dataToSendToServer = false;

      this.$store.dispatch("loadData");

      this.$router.push({ name: "AllImages" });
    },
    setCurrentImgFromComponent(id) {
      return (this.currentImg = id);
    },
    areYouSure() {
      let a = confirm("Voulez vous quitter la page sans sauvegarder ?");
      if (a) {
        this.$router.push({ name: "AllImages" });
      }
    },
  },
};
</script>
