<template>
  <div>
    <aside>
      <a class="asideBtn btn1">
        <i class="fas fa-exchange-alt"></i>
        <span class="ab_btn">
          Vous pouvez changer l'ordre des images en cliquant sur une image et en
          la déplacent à la position voulu
        </span>
      </a>
      <a class="asideBtn btn1 noclick">
        <i class="fas fa-check-double"></i>
      </a>
      <a class="asideBtn btn1 noclick">
        <i class="far fa-images"></i>
      </a>
    </aside>
    <div class="containerGrid">
      <draggable
        v-model="$store.state.keywordTable[currentDiapo].imageName"
        @end="sendToParents"
        v-bind="dragOptions"
      >
        <transition-group class="imgSquare">
          <article
            v-for="(image, index) in $store.state.keywordTable[currentDiapo]
              .imageName"
            v-bind:key="`image-${index}`"
            v-on:click="zoomOnImg(index)"
            :class="getImgSqureClass(index)"
          >
            <!-- <img :src="require('@/../'+ $store.state.keywordTable[currentDiapo].imageName[index])" /> -->
            <!-- <img
              :src="
                require('@/assets/images/' +
                  $store.state.keywordTable[currentDiapo].imageName[index])
              "
            /> -->
            <img
              :src="
                '/static/uploadimg/' +
                $store.state.keywordTable[currentDiapo].imageName[index]
              "
            />
            <div class="imgPanel">
              <input type="checkbox" />
              <i class="fas fa-retweet fa-2x"></i>
              <i class="fas fa-trash fa-2x"></i>
            </div>
          </article>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "listimgVueComponent",
  props: ["currentDiapo"],
  components: {
    draggable,
  },
  data() {
    return {
      // imageList: this.imgList
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 600,
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    getImgSqureClass(index) {
      if (
        this.$store.state.keywordTable[this.currentDiapo].main_image ==
        this.$store.state.keywordTable[this.currentDiapo].imageName[index]
      ) {
        return "selectedImg";
      }
      if (this.$store.state.imagesTable[index].alt == "") {
        return "missingAlt";
      }
    },
    // show image on his index on slideshow
    zoomOnImg(index) {
      this.$emit("setCategory");
      this.$emit("setCurrentImg", index);
    },
    sendToParents() {
      this.$emit("ismodified");
    },
  },
};
</script>


<style>
aside {
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 8%;
  width: 9%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.containerGrid {
  width: 91%;
  height: 100%;
  margin-left: 9%;
}
.imgSquare {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-height: 93vh;
  /* background: teal; */
  overflow-y: auto;
}
.imgSquare article {
  width: 18%;
  height: 30vh;
  margin: 1%;
  object-fit: cover;
  overflow: hidden;
  position: relative;
}
.imgSquare img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  transition: all 3s ease;
  cursor: grab;
  cursor: -webkit-grab;
  cursor: -moz-grab;
}
.imgSquare article:active {
  /* cursor: none;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing; */
  box-shadow: 0 0 0 3px white;
  opacity: 0.2;
  /* transition: all 1s ease-in */
}
.mydragClass {
  cursor: grabbing;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  background: olive;
  border: 20px white solid;
  padding: 10px;
}
.imgSquare img:hover {
  object-position: bottom right;
  transition: all 1s ease;
}
.imgSquare > div:hover .imgPanel {
  display: flex;
}

.imgPanel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20%;
  background: rgba(255, 255, 255, 0.6);
  /* display: flex; */
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  display: none;
  transition: all 1s ease;
}
.imgPanel i {
  margin: 8px 0;
}
.selectedImg {
  /* border: 2px white solid; */
  box-shadow: 0 0 0 5px lightseagreen;
}
.missingAlt {
  box-shadow: 0 0 0 1px tomato;
}

/* .ghost {
  opacity: 0.8;
  border: 4px gray solid;
  background: #c8ebfb;
} */

.asideBtn {
  position: relative;
  display: flex;
  background: #fff;
}
.ab_btn {
  position: absolute;
  width: 450px;
  opacity: 0;
  font-size: 0;
  height: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px white solid;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6rem;
  border-radius: 50px;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 1s ease;
  flex-wrap: nowrap;
  transform: translateX(-450px);
}
.asideBtn i {
  font-size: 2.5em;
  border-radius: 50%;
  border: 1px white solid;
  padding: 1rem;
  cursor: pointer;
  transition: all 1s ease;
}
.asideBtn:hover i {
  transition: all 1s ease;
  background-color: rgba(255, 255, 255, 0.2);
}
.asideBtn:hover .ab_btn {
  opacity: 1;
  font-size: 1rem;
  transition: all 1s ease;
  animation-name: textDelay;
  transform: translateX(0);
}
</style>