<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Modal, initializeStores } from '@skeletonlabs/skeleton';
	import { signIn, signOut } from '@auth/sveltekit/client'
  	import { page } from '$app/stores'
	// import ThemeMenu from '$lib/components/ThemeMenu.svelte'

	initializeStores();

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import ThemeMenu from '$lib/components/ThemeMenu.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let loggedIn = $page.data.session?.user?.email;
	async function handleClick() {
			if ($page.data.session?.user){
				await signOut();
			}else{
				await signIn('github');
			}
			console.log(`$page.data.session?.user}`)
		}
</script>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Ethan Ayers</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/"
					rel="noreferrer"
				>
					Home
				</a>
				{#if loggedIn}
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/movies"
					rel="noreferrer"
				>
					Movies
				</a>
				<a
				class="btn btn-sm variant-ghost-surface"
				href="/reviews"
				rel="noreferrer"
			>
				AirBnB
			</a>
			<a
			class="btn btn-sm variant-ghost-surface"
			href="/sales"
			rel="noreferrer"
		>
			Sales
		</a>
		{/if}
				{#if loggedIn}
					<ThemeMenu />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
