<template>
<nav class="navbar is-fixed-top is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
  <div class="navbar-brand">
    <div class="navbar-item is-size-4 is-family-monospace">
        NoteMe
    </div>

    <a ref="burgerMenuRef" role="button" @click.prevent="showMobileNav = !showMobileNav" :class="{'is-active': showMobileNav}" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': showMobileNav}">


    <div class="navbar-end">
      <RouterLink :to="{name: 'notes'}" class="navbar-item">
        Notes
      </RouterLink>
      <RouterLink :to="{name: 'stats'}" class="navbar-item">
        Stats
      </RouterLink>
    </div>
  </div>
  </div>
</nav>

</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const showMobileNav = ref(false);
const burgerMenuRef = ref(null);

onClickOutside(burgerMenuRef, () => showMobileNav.value = false);
</script>