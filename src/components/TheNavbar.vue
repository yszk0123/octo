<template>
  <nav class="relative flex flex-wrap items-center content-between py-3 px-4 z-index-10 md:hidden p-6 w-full">
    <router-link class="inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap flex justify-between items-center" :to="{ name: 'dashboard' }">
      <TheLogo size="2.25em"/>
    </router-link>
    <div class="flex items-stretch fixed top-3 right-3">
      <router-link class="button button-size-medium button-color-gray" :to="{ name: 'tags' }">
        <svg height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span class="ml-2">Tags</span>
      </router-link>
      <router-link class="button button-size-medium button-color-gray ml-2" :to="{ name: 'menu' }" role="button" aria-haspopup="true" aria-expanded="false">
        <svg height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span class="ml-2">Menu</span>
      </router-link>
      <router-link v-if="isDashboard" :to="{ name: 'quick-action' }" class="button button-size-medium button-color-gray ml-2">
        <svg height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </router-link>
      <router-link v-else-if="isDocument" :to="{ name: 'document-meta', params: { id: document.id } }" class="button button-size-medium button-color-gray ml-2">
        <svg height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </router-link>
      <button v-else @click="close" class="button button-size-medium button-color-gray ml-2">
        <svg height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
import TheLogo from '@/components/TheLogo'

import { open } from '@/router'

export default {
  name: 'TheNavbar',
  components: {
    TheLogo,
  },
  computed: {
    document() {
      return this.$store.getters.currentDoc
    },
    isDocument() {
      return this.document && this.$route.name === 'document'
    },
    isDashboard() {
      return this.$route.name === 'dashboard'
    },
  },
  methods: {
    close() {
      if (this.document) {
        return open({
          name: 'document',
          params: {
            id: this.document.id,
          },
        })
      }

      open({ name: 'dashboard' })
    },
  },
}
</script>
