<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const props = defineProps(['src'])

const height = ref(0)

watchEffect(() => {
	console.log('iframe: height - ', height.value)
})

onMounted(() => {
	window.addEventListener('message', (ev) => {
		if (event.data.type === 'iframe-height') {
			console.log(ev.data)
			height.value = event.data.height + 'px'
		}
	})
})
</script>

<template>
	<iframe :height="height" width="100%" frameborder="0" :src="props.src"></iframe>
</template>