<template >
  <section class="myBody AIV">
    <div class="giantCircle">
      <div class="centerCircle">
        <router-link to="/backend" class="navItem backBtn retourBtn">
          <i class="fas fa-arrow-circle-left backFa"></i>
          Retour
        </router-link>

        <a class="navItem item2" @click="onClickAddKeyword = !onClickAddKeyword"
          >Créer un nouveau diapo</a
        >

        <newKeyWordComp
          :isOpen.sync="onClickAddKeyword"
          cssPosition="item3"
          :sendToServer="true"
          v-on:change="setClassRightBtns"
        ></newKeyWordComp>

        <div class="right arrowUp" v-on:click="navButtons(-1)">
          <i class="fas fa-arrow-circle-up backFa"></i>
        </div>

        <router-link
          v-for="(keyword, index) in $store.state.keywordTable"
          :key="index"
          :class="getLinkClass(index)"
          :to="{ name: 'imageByCategory', params: { id: keyword.keywords } }"
          @mouseover.native="mouseOver(keyword.main_image)"
          @mouseleave.native="mouseLeave"
          >{{ keyword.keywords }}</router-link
        >

        <div class="right arrowDown" v-on:click="navButtons(1)">
          <i class="fas fa-arrow-circle-down backFa"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import newKeyWordComp from "@/components/backend/newKeyWordComp.vue";
import Blob from "@/components/Blob.vue";
import secure_pages from "@/mixin/secure_pages.vue";

export default {
  data() {
    return {
      classNameDispatcher: [],
      nbrOfButton: 9,
      classNameBtns: "navItem right itemR",
      onClickAddKeyword: false,
    };
  },
  components: {
    newKeyWordComp,
    Blob,
  },
  mixins: [secure_pages],
  created() {
    this.uservalidation();
  },
  watch: {},
  mounted: function () {
    this.setClassRightBtns();
  },

  methods: {
    getLinkClass(i) {
      if (this.classNameDispatcher.length === 0) {
        this.setClassRightBtns();
      }
      return this.classNameDispatcher[i];
    },
    navButtons(direction) {
      if (direction === 1) {
        let a = this.classNameDispatcher.shift();
        this.classNameDispatcher.push(a);
      } else {
        let b = this.classNameDispatcher.pop();
        this.classNameDispatcher.unshift(b);
      }
    },

    mouseOver: function (imageName) {
      let blobEl = document.getElementsByClassName("blobs")[0];

      if (imageName) {
        // let a = require("@/../static/uploadimg/" + imageName);
        //   let a = new Image()
        // a.src=""
        //PRODUCTION
        // let a = require("@/assets/uploadimg/" + imageName);
        // let a = require("@/assets/images/" + imageName);
        let url =
          "no-repeat 100% 100% url('/static/uploadimg/" + imageName + "')";
        // let url = "no-repeat 100% 100% url(" + a + ")";
        blobEl.style.background = url;
        blobEl.style.backgroundSize = "cover";
        document.getElementsByClassName("smallerSvg")[0].style.transform =
          "scale(2) translateY(15%)";
        document.getElementsByClassName("mediumSvg")[0].style.transform =
          "scale(1.1) translateY(1%)";
        document
          .getElementsByClassName("smallCircle")[0]
          .setAttribute("stroke-width", "10");
      } else {
        blobEl.style.background = "rgba(255,255,255,0.3)";
      }
    },
    mouseLeave: function () {
      document.getElementsByClassName("blobs")[0].style.background = "";
      document.getElementsByClassName("smallerSvg")[0].style.transform =
        "scale(1)";
      document.getElementsByClassName("mediumSvg")[0].style.transform =
        "scale(1)";
      document
        .getElementsByClassName("smallCircle")[0]
        .setAttribute("stroke-width", "20");
      // document.getElementById("mypath").setAttribute("stroke", "black");
    },

    setClassRightBtns() {
      this.classNameDispatcher = [];
      for (
        let index = 0;
        index < this.$store.state.keywordTable.length;
        index++
      ) {
        if (index <= this.nbrOfButton - 1) {
          this.classNameDispatcher.push(this.classNameBtns + index);
        } else {
          this.classNameDispatcher.push("hide");
        }
      }
    },
  },
};
</script>

<style scoped>
.imageView {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1c313a;
  display: none;
}
.AIV {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
}
.AIV .navItem {
  background: #fff;
}
.AIV .addkeywordC {
  right: 0;
  left: 0;
}
</style>
