<style src="./newImage.css"></style>
<template src="./newImage.html"></template>

<script>
import currentImgComponent from "@/components/backend/newImage/currentImgComp.vue";
import newKeyWordComp from "@/components/backend/newKeyWordComp.vue";
import secure_pages from "@/mixin/secure_pages.vue";

const axios = require("axios");

export default {
  name: "App",
  data() {
    return {
      newKeyword: null /*les nouveaux mot clefs ajouté*/,
      files: [] /*la liste des images importé*/,
      itemsBox: [],

      item: {
        name: "",
        legend: "",
        description: "",
        qttUtillisation: 0,
        keyword: [],
        fileIsDeleted: "",
        imageUrl: "",
      },

      newKeywords: [],
      onClickAddKeyword: false,
      currentImg: 0,
    };
  },
  components: {
    currentImgComponent,
    newKeyWordComp,
  },

  mixins: [secure_pages],
  created() {
    this.uservalidation();
  },

  destroyed: function () {
    document.documentElement.style.setProperty("--circle-radius", "40vw");
  },
  computed: {
    nbrImageLeft: {
      get() {
        return this.nbrImageNeedKW();
      },
    },
  },

  methods: {
    isAlreadyOnDb(value = false) {
      if (value == false) {
        try {
          value = this.itemsBox[this.currentImg].name;
        } catch (error) {
          return false;
        }
      }

      for (let i = 0; i < this.$store.state.imagesTable.length; i++) {
        if (this.$store.state.imagesTable[i].title == value) {
          return true;
        }
      }
      return false;
    },

    missingImgKeywordMsg() {
      let val =
        "Chaque image doit être associée à au moins un diaporama.  Informations manquantes pour les images aux index suivants : ";

      for (let i = 0; i < this.files.length; i++) {
        if (!this.isAlreadyOnDb(this.itemsBox[i].name)) {
          if (
            this.itemsBox[i].keyword.length == 0 &&
            this.itemsBox[i].fileIsDeleted === ""
          ) {
            val += "<br/>" + (i + 1);
          }
        }
      }
      this.$store.commit("msgToUsers", val);
    },

    nbrImageNeedKW() {
      let val = 0;

      for (let i = 0; i < this.files.length; i++) {
        if (!this.isAlreadyOnDb(this.itemsBox[i].name)) {
          if (
            this.itemsBox[i].keyword.length == 0 &&
            this.itemsBox[i].fileIsDeleted === ""
          ) {
            val++;
          }
        }
      }
      return val;
    },

    uploadImgOnFront() {
      let actualLength = this.files.length;
      for (let i = 0; i < this.$refs.myFiles.files.length; i++) {
        this.files.push(this.$refs.myFiles.files[i]);
      }
      for (let index = actualLength; index < this.files.length; index++) {
        let currentItem = JSON.parse(JSON.stringify(this.item));

        currentItem.imageUrl = URL.createObjectURL(this.files[index]);
        currentItem.name = this.files[index].name;
        this.itemsBox.push(currentItem);
      }
      console.log(this.itemsBox);
      this.currentImg = actualLength;
      document.documentElement.style.setProperty("--circle-radius", "45vw");
      //faire message erreur si 0
    },

    deleteImg() {
      if (this.itemsBox[this.currentImg].fileIsDeleted === "") {
        this.itemsBox[this.currentImg].fileIsDeleted = "deleted";
      } else {
        this.itemsBox[this.currentImg].fileIsDeleted = "";
      }
    },

    onClicPrepareDataBeforeSending() {
      let tableau = [];
      tableau.push({ newKeywords: this.newKeywords });

      for (let index = 0; index < this.files.length; index++) {
        if (this.itemsBox[index].fileIsDeleted === "") {
          this.itemsBox[index].qttUtillisation = this.itemsBox[
            index
          ].keyword.length;
          tableau.push(this.itemsBox[index]);
        }
      }

      var json_arr = JSON.stringify(tableau);
      this.sendToServer(json_arr);

      setTimeout(() => {
        this.$router.push({ name: "BackEndHome" });
      }, 100);
    },

    sendToServer(tableau) {
      let formData = new FormData();
      formData.append("datas", tableau);
      formData.append("key", JSON.stringify(this.$store.state.ws_key));

      for (var i = 0; i < this.files.length; i++) {
        if (this.itemsBox[i].fileIsDeleted === "") {
          let file = this.files[i];
          formData.append("files[" + i + "]", file);
        }
      }

      let req = this.$store.state.phpLink + "?action=newdatas";

      axios
        .post(req, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$store.commit(
            "msgToUsers",
            res /*"Les nouvelles images ont bien été télécharger"*/
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //Fleches
    next(direction) {
      let nextvalue = this.currentImg + direction;
      if (nextvalue >= this.files.length) {
        this.currentImg = 0;
      } else if (nextvalue < 0) {
        this.currentImg = this.files.length - 1;
      } else {
        this.currentImg = nextvalue;
      }
    },

    confirmBeforeLeave() {
      if (this.files.length !== 0) {
        let a = confirm("Etes vous sur de vouloir quitter sans sauvegarder ?");
        if (a) {
          this.$router.push({ name: "BackEndHome" });
        }
      } else {
        this.$router.push({ name: "BackEndHome" });
      }
    },
  },
};
</script>
