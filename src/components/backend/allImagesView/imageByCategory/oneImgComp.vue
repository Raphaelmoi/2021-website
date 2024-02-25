<template>
  <article class="imgAlone" v-on:mouseup="toggleFalse">
    <div class="imgSide">
      <b v-on:click="$emit('setCategory')" class="pointer">X</b>

      <div class="navImg navLeft" v-on:click="navDiapo(-1)">
        <i class="fas fa-arrow-circle-left fa-3x"></i>
      </div>
      <div class="navImg navRight" v-on:click="navDiapo(1)">
        <i class="fas fa-arrow-circle-right fa-3x"></i>
      </div>

      <img
        v-for="(image, index) in $store.state.keywordTable[currentDiapo]
          .imageName"
        :key="image.id"
        :src="
          '/static/uploadimg/' +
          $store.state.keywordTable[currentDiapo].imageName[index]
        "
        v-bind:class="currentImg == index ? '' : 'hide'"
      />
    </div>

    <aside class="myAside" v-on:mouseup="toggleFalse">
      <div
        class="controlBar"
        v-on:mousedown="toggleTrue"
        v-on:mouseup="toggleFalse"
        v-on:mousemove="grabTheBar"
      ></div>
      <h4>
        {{ $store.state.keywordTable[currentDiapo].imageName[currentImg] }}
      </h4>

      <div class="inputsBox">
        <h5>Legende :</h5>
        <div class="inputBox">
          <p v-if="!listStatus && imgArray[currentImg].legend !== ''">
            {{ imgArray[currentImg].legend }}
          </p>
          <p v-else-if="!listStatus" style="color: #888">
            Entre une légende en cliquant ici
            <i class="fas fa-arrow-right"></i>
          </p>
          <input
            v-if="listStatus"
            type="text"
            v-model="imgArray[currentImg].legend"
            value="imgArray[currentImg].legend"
          />
          <button v-if="!listStatus" v-on:click="declareChange">
            <i class="fas fa-pen"></i>
          </button>
        </div>

        <h5>Balise alt</h5>
        <div class="inputBox">
          <p v-if="!listStatus && imgArray[currentImg].alt !== ''">
            {{ imgArray[currentImg].alt }}
          </p>
          <p v-else-if="!listStatus" style="color: #888">
            Entrer contenu balise alt ici
            <i class="fas fa-arrow-right"></i>
          </p>
          <input
            v-if="listStatus"
            type="text"
            v-model="imgArray[currentImg].alt"
            value="imgArray[currentImg].alt"
            placeholder="balise alt"
          />
          <button v-if="!listStatus" v-on:click="declareChange">
            <i class="fas fa-pen"></i>
          </button>
        </div>
      </div>

      <div>
        <div
          :key="fakerender"
          :class="
            $store.state.keywordTable[currentDiapo].main_image ==
            imgArray[currentImg].title
              ? 'firstPicture activeBtn'
              : 'firstPicture'
          "
          @click="
            $store.state.keywordTable[currentDiapo].main_image =
              imgArray[currentImg].title;
            fakerender += 1;
            declareChange();
          "
        >
          <p>Image à la une</p>
        </div>
        <div
          class="firstPicture deleteImage"
          style="border-color: tomato"
          @click="deleteImgFromDiapo()"
        >
          <p><i class="fas fa-trash"></i>Supprimer cette image</p>
        </div>
      </div>

      <keywordComponent
        :keywords="$store.state.keywordTable"
        :imgname="imgArray[currentImg].title"
        :diapoName="$store.state.keywordTable[currentDiapo].keywords"
        v-on:isModified="
          $emit('sendKWTableToServer');
          declareChange();
        "
      ></keywordComponent>

      <div style="position: relative" class="newkwBtn">
        <a @click="onClickAddKeyword = !onClickAddKeyword"
          >Créer un nouveau diapo</a
        >
        <newKeyWordComp
          :isOpen.sync="onClickAddKeyword"
          v-on:change="$emit('reloadKeywordTable')"
          :sendToServer="true"
        ></newKeyWordComp>
      </div>
    </aside>
  </article>
</template>

<script>
import keywordComponent from "@/components/backend/allImagesView/imageByCategory/keywordsComp.vue";
import newKeyWordComp from "@/components/backend/newKeyWordComp.vue";

export default {
  data() {
    return {
      isHandlerDragging: false,
      fakerender: 0,
      keywordsSendToServer: false,
      onClickAddKeyword: false,
      imgArray: [],
    };
  },
  props: ["currentImage", "listStatus", "currentDiapo"],
  created() {
    for (let item of this.$store.state.keywordTable[this.currentDiapo]
      .imageName) {
      for (let i = 0; i < this.$store.state.imagesTable.length; i++) {
        if (item == this.$store.state.imagesTable[i].title) {
          this.imgArray.push(this.$store.state.imagesTable[i]);
        }
      }
    }
  },
  components: {
    keywordComponent,
    newKeyWordComp,
  },
  computed: {
    currentImg: {
      get() {
        return this.currentImage;
      },
      set(newVal) {
        this.$emit("update:currentImage", newVal);
      },
    },
  },
  methods: {
    declareChange() {
      this.$emit("ismodified");
    },
    //diaporama navigation
    deleteImgFromDiapo() {
      if (
        confirm(
          "Etes vous sur de vouloir supprimer cette image de ce diaporama? Cette action est irréverssible"
        )
      ) {
        //faire -> supprimer image du diapo
        //enlever une utilisation a l'image

        let oldMainImage = this.$store.state.keywordTable[this.currentDiapo]
          .main_image;
        let changeMainImage = false;
        let imgNameArray = this.$store.state.keywordTable[this.currentDiapo]
          .imageName;

        for (let i = 0; i < imgNameArray.length; i++) {
          if (imgNameArray[i] == imgNameArray[this.currentImg]) {
            if (imgNameArray[this.currentImg] == oldMainImage) {
              changeMainImage = true;
            }
            this.$store.state.keywordTable[this.currentDiapo].imageName.splice(
              i,
              1
            );
          }
        }
        if (changeMainImage) {
          this.$store.state.keywordTable[
            this.currentDiapo
          ].main_image = this.$store.state.keywordTable[
            this.currentDiapo
          ].imageName[0];
        }
        this.declareChange();
        this.$emit("setCategory");
      }
    },
    navDiapo(direction) {
      let nextvalue = this.currentImg + direction;
      if (
        nextvalue >=
        this.$store.state.keywordTable[this.currentDiapo].imageName.length
      ) {
        this.currentImg = 0;
      } else if (nextvalue < 0) {
        this.currentImg =
          this.$store.state.keywordTable[this.currentDiapo].imageName.length -
          1;
      } else {
        this.currentImg = nextvalue;
      }
    },
    // state for grabbing the bar
    toggleTrue() {
      this.isHandlerDragging = true;
    },
    toggleFalse() {
      this.isHandlerDragging = false;
    },
    grabTheBar() {
      var e = e || window.event;
      let bar = document.getElementsByClassName("controlBar")[0];
      let leftSide = document.getElementsByClassName("imgSide")[0];
      let rightSide = document.getElementsByClassName("myAside")[0];

      if (this.isHandlerDragging && e.target === bar) {
        let x = e.pageX;
        let screenWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;

        let percentageX = (x * 100) / screenWidth;
        percentageX = Math.round(percentageX * 100) / 100;
        if (percentageX <= 100 && percentageX >= 0) {
          leftSide.style.width = percentageX + "%";
          rightSide.style.width = 100 - percentageX + "%";
        }
      }
    },
  },
};
</script>

<style scoped>
.imgAlone .addkeywordC {
  bottom: 100px;
  right: 100px;
  left: unset;
}
.imgAlone {
  display: flex;
  height: 93vh;
}
.imgSide {
  /* flex: 3; */
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.newkwBtn {
  position: relative;
  cursor: pointer;
  border: 1px black solid;
  padding: 8px 12px;
  border-radius: 4px;
  transition: 0.3s ease;
}
.newkwBtn:hover {
  background: #333;
  transition: 0.3s ease;
}
.newkwBtn:hover a {
  color: white;
}
.inputsBox {
  width: 100%;
}
.imgSide img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
.imgSide b {
  color: aliceblue;
  font-size: 2rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
}
.navImg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #3333;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
}
.navImg:hover {
  color: #333;
  transition: all 1s ease;
}
.navLeft {
  left: 2rem;
}
.navRight {
  right: 2rem;
}
.imgAlone aside {
  width: 25%;
  background: white;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  position: relative;
  top: 0;
}
.arrow-up {
  position: absolute;
  right: 5px;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}
.controlBar {
  /* background-color: rgb(17, 122, 117); */
  border-left: 8px rgb(17, 122, 117) solid;
  position: absolute;
  font-weight: bold;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40px;
  cursor: grab;
}
.controlBar:active {
  cursor: grabbing;
  border-left: 12px rgb(17, 122, 117) solid;
}
.myAside {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.myAside h4,
.myAside h5,
.myAside p {
  margin: 0;
}
.inputBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inputBox p {
  flex: 3;
  /* background-color: lightblue; */
  height: 100%;
}
.inputBox button {
  /* flex: 1; */
  border: none;
  background: cadetblue;
  color: white;
  font-size: 1rem;
  padding: 0.8rem;
  cursor: pointer;
}
.inputBox input {
  flex: 3;
  padding: 0.5rem 0.4rem;
  margin-right: 4px;
  border: 2px cadetblue solid;
  background-color: transparent;
  color: rgb(27, 77, 74);
  font-size: 0.9rem;
}

.firstPicture {
  /* background-color: lightslategray; */
  color: black;
  /* width: fit-content; */
  padding: 0.5rem;
  text-align: center;
  border: 1px cadetblue solid;
  border-radius: 4px;
  margin: 0.5rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
}
.firstPicture:hover {
  background-color: cadetblue;
  transition: all 0.3s ease;
}
.activeBtn {
  background-color: cadetblue;
  color: white;
}
.deleteImage {
  transition: all 0.3s ease;
}
.deleteImage i {
  margin-right: 8px;
}
.deleteImage:hover {
  background-color: tomato;
  /* color: white; */
  transition: all 1s ease;
}
</style>