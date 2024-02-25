import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import BackEndHome from '@/components/backend/BackEndHome.vue'
import LogIn from '@/components/logIn.vue'
import NewImage from '@/components/backend/newImage/newImage.vue'
import AllImages from '@/components/backend/allImagesView/allImagesView.vue'
import imageByCategory from '@/components/backend/allImagesView/imageByCategory/imageByCategory.vue'
import SlidesVue from '@/components/SlidesVue.vue'
import paginatevue from '@/components/paginatevue.vue'
// import Blobs from '@/components/Blob.vue'
import Blob from '@/components/Blob.vue'
// import Labyrinthe from '@/pages/Labyrinthe.vue'
import keywordComponent from '@/components/backend/allImagesView/imageByCategory/keywordsComp.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'logIn',
      component: LogIn
    },
    {
      path: '/backend',
      name: 'BackEndHome',
      component: BackEndHome
    },
    {
      path: '/newImage',
      name: 'NewImage',
      component: NewImage
    },
    {
      path: '/allImages',
      name: 'AllImages',
      component: AllImages
    },
    {
      path: '/image/:id',
      name: 'imageByCategory',
      component: imageByCategory
    },
    {
      path: '/diaporama',
      name: 'slidesVue',
      component: SlidesVue
    },
    {
      path: '/pagination',
      name: 'paginatevue',
      component: paginatevue
    },
    // {
    //   path: '/blobs',
    //   name: 'Blobs',
    //   component: Blobs
    // },
    {
      path: '/Blob',
      name: 'Blob',
      component: Blob
    },
    // {
    //   path: '/labyrinthe',
    //   name: 'Labyrinthe',
    //   component: Labyrinthe
    // },
  ]
})
