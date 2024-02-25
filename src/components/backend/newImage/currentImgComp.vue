<template>
  <section>
    <div class="itemImg">
      <!-- surcouche si la photo est supprimé -->
      <div v-if="isDelete !== ''" class="deletedItem">
        X
        <br />
        <span style="font-size: 2rem">photo supprimée</span>
      </div>

      <img id="imageItem" class="currentImg" :src="imgUrl" alt="your image" />

      <div>
        <div class="keywordBox">
          <div
            v-for="keyword in $store.state.keywordTable"
            v-bind:class="getClass(currentIndex, keyword.keywords)"
            :key="keyword.keywords"
            @click="addKeyWord(currentIndex, keyword)"
          >
            {{ keyword.keywords }}
          </div>
          <i
            class="fas fa-plus"
            style="background: lightgray"
            @click="onClickAddKeyword = !onClickAddKeyword"
          ></i>
        </div>

        <div class="inputBoxInfo">
          <label for="legend">Légende</label>
          <input type="text" name="legend" v-model="legend" />
        </div>
        <div class="inputBoxInfo">
          <label for="description">Description (alt)</label>
          <input type="text" name="description" v-model="description" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "currentImgComp",
  props: [
    "isDelete",
    "imgUrl",
    "kwList",
    "currentIndex",
    "selectKW",
    "legende",
    "desc",
    "addKW",
  ],

  computed: {
    onClickAddKeyword: {
      get() {
        return this.addKW;
      },
      set(newVal) {
        this.$emit("update:addKW", newVal);
      },
    },

    selectedKeyWords: {
      get() {
        return this.selectKW;
      },
      set(newVal) {
        this.$emit("update:selectKW", newVal);
      },
    },
    legend: {
      get() {
        return this.legende;
      },
      set(val) {
        return this.$emit("update:legende", val);
      },
    },
    description: {
      get() {
        return this.desc;
      },
      set(val) {
        return this.$emit("update:desc", val);
      },
    },
  },
  methods: {
    //return different class name depend if a keyword is selected or not
    getClass(imgId, categoryName) {
      if (this.selectedKeyWords.indexOf(categoryName) >= 0) {
        return "keyword selected";
      } else {
        return "keyword ";
      }
    },
    //set or unset a keyword for an image
    addKeyWord(imgId, keyword) {
      let value = this.selectedKeyWords.indexOf(keyword.keywords);
      if (value >= 0) {
        this.selectedKeyWords.splice(value, 1);
      } else {
        this.selectedKeyWords.push(keyword.keywords);
      }
    },
  },
};
</script>


<style>
.currentImg {
  width: 100%;
  height: 50vh;
  object-fit: contain;
  filter: drop-shadow(2px 4px 12px #999);
}

.itemImg {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 3rem 0;
}
.itemImg > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  z-index: 2;
  /* width: 60%; */
}
.inputBoxInfo {
  display: flex;
  align-items: center;
  width: 100%;
  color: #333;
}
.inputBoxInfo label {
  flex: 1;
}
.inputBoxInfo input {
  height: 30px;
  flex: 3;
  padding: 2px 10px;
  margin: 10px;
  background-color: rgba(100, 100, 100, 0);
  border: none;
  border-bottom: 2px #333 solid;
  color: #333;
  outline: none;
}
.keywordBox {
  display: flex;
  justify-content: center;
  margin: 1% 10%;
  flex-wrap: wrap;
}

.keyword {
  margin: 4px;
  padding: 5px 10px;
  border: 1px #999 solid;
  /* background-color: gray; */
  border-radius: 5px;
  width: fit-content;
  cursor: pointer;
  color: #333;
}
.selected {
  background-color: #4db6ac;
  color: white;
}
.selected:hover {
  background-color: #00867d;
  /* color: white; */
}
label {
  font-size: 0.9rem;
  /* color: white; */
}
.NI .navItem {
  font-size: 0.9rem;
}

.validateAll {
  line-height: 0;
  padding: 0 18px;
  /* background-color: #4db6ac; */
  border-radius: 8px;
  border: 1px black solid;
  /* color: white; */
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 30px;
  cursor: pointer;
}
.validateAll:hover {
  background-color: #000;
  color: white;
}
</style>