<script lang="ts">
	import { FileForm, Seo } from 'chyme-svelte';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';

	export let data: PageData;
</script>

<Seo title={$LL.settings_seo_title()} description={$LL.settings_seo_description()} {locales} />

<h1>Settings</h1>

<h2>Profile</h2>

<h3>Profile image</h3>

<div class="img-container">
	<img
		src="/img/{data.user?._id}?_={data.user?.lastUpdated?.getTime()}"
		alt="profile picture of {data.user?.email}"
	/>
</div>

<FileForm csrf={data.csrf} action="?/uploadProfileImage" />

<h3>Email</h3>

<p>email: {data.user?.email}</p>

<slot />

<style>
	.img-container {
		position: relative;
		width: 200px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}
</style>
