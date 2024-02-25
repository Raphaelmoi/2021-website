<template>
  <div class="keywordBox">
    <div
      v-for="(keyword, index) in $store.state.keywordTable"
      :class="getKeywordClass(keyword.imageName, keyword.title)"
      :key="index"
      @click="addKeyWord(keyword)"
    >{{ keyword.keywords }}</div>
  </div>
</template>

<script>
export default {
  name: "keywordComponent",

  props: ["imgname", "diapoName"],
  data() {
    return {
      datachanged: false,
      keywords: []
    };
  },

  methods: {
    addKeyWord(keyword) {
      let imgList = keyword.imageName;
      if (
        keyword.imageName === undefined ||
        keyword.imageName === null ||
        keyword.imageName == ""
      ) {
        keyword.imageName = [];
      }
      let isCurrentCategory = false;
      if (keyword.keywords == this.diapoName) {
        isCurrentCategory = true;
      }
      let isAlreadyOnList = false;
      for (let i = 0; i < keyword.imageName.length; i++) {
        if (keyword.imageName.indexOf(this.imgname) >= 0) {
          isAlreadyOnList = true;
        }
      }

      if (isAlreadyOnList && isCurrentCategory) {
        let a = confirm(
          "Attention! cette action va supprimer l'image de ce diaporama"
        );
        if (a) {
          const indexOfImg = element => element == this.imgname;
          let id = keyword.imageName.findIndex(indexOfImg);
          keyword.imageName.splice(id, 1);
        }
      } else if (isAlreadyOnList) {
        const indexOfImg = element => element == this.imgname;
        let id = keyword.imageName.findIndex(indexOfImg);
        keyword.imageName.splice(id, 1);
        // alert('l-action supprime l-image de n-importe qu-elle diaporamas ?' );
      } else {
        keyword.imageName.push(this.imgname);
        // alert('l-actionajoute l-image au diaporama' );
      }
      this.datachanged = true;
      this.$emit("isModified");
    },
    //return different class name depend if a keyword is selected or not
    getKeywordClass(imagesList, diapo) {
      if (imagesList && imagesList.length !== 0) {
        for (let i = 0; i < imagesList.length; i++) {
          if (imagesList.indexOf(this.imgname) >= 0) {
            if (diapo == this.diapoName) {
              return "keyword selectedCurrentDiapo";
            } else {
              return "keyword selected";
            }
          } else {
            return "keyword";
          }
        }
      } else {
        return "keyword";
      }
    }
  }
};
</script>

<style scoped>
.keywordBox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.keyword {
  flex: 3;
  padding: 2px 10px;
  /* background-color: rgba(150, 150, 150, 1); */
  border: 1px teal solid;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 4px;
  border-radius: 5px;
  width: fit-content;
  cursor: pointer;
  color: #111;
}
.selected {
  background-color: #4db6ac;
  color: white;
  border: 1px transparent solid;
}
.selected:hover {
  background-color: #00867d;
  color: white;
}
.selectedCurrentDiapo {
  background: rgb(26, 173, 104);
  color: white;
  border: 1px transparent solid;
}
.selectedCurrentDiapo:hover {
  background: rgb(21, 139, 84);
}
</style>
