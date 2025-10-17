<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import HomeContent from '../components/HomeContent.vue';
import { sizes, subscribe, unsubscribe } from '../utils/media-query';

function getScreenSizeInfo() {
  const screenSizes = sizes();

  return {
    isSmall: screenSizes["screen-small"] || screenSizes["screen-x-small"],
  };
}

const screen = reactive({ size: getScreenSizeInfo() });

function screenSizeChanged() {
  screen.size = getScreenSizeInfo();
}

onMounted(() => {
  subscribe(screenSizeChanged);
});

onBeforeUnmount(() => {
  unsubscribe(screenSizeChanged);
});
</script>

<template>
  <HomeContent :is-screen-small="screen.size.isSmall" />
</template>

