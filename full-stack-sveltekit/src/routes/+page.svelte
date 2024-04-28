<script lang='ts'>
    import { signIn, signOut } from '@auth/sveltekit/client'
  	import { page } from '$app/stores'

	let loggedIn = $page.data.session?.user?.email;
	async function handleClick() {
			if ($page.data.session?.user){
				await signOut();
			}else{
				await signIn('github');
			}
			console.log(`$page.data.session?.user}`)
		}
	let username = $page.data.session?.user?.name;
</script>
<section class="w-screen h-screen bg-[url('/blue-background.jpg')] bg-cover text-white">

<div class="container h-full mx-auto flex flex-col justify-center items-center">
    <div class="space-y-10 text-center">
        <h2 class="text-4xl font-bold">Welcome to My App{username ? `, ${username}` : ''}</h2>
    </div>
    <div class="flex items-center mt-8">
		{#if !loggedIn}
        <h4 class="mr-6">Sign in to get started</h4>
		<div class="mt-1">
			<svg class="animate-bounce-sideways w-6 h-6 text-white-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path>
			</svg>
		</div>
		{/if}
		<div>
			<button class="btn btn-md variant-filled-secondary"
				on:click={handleClick}>
				{loggedIn ? 'Logout' : 'Login'}
			</button>
		</div>
    </div>
</div>

</section>
<style>

@keyframes bounce-sideways {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-20px);
  }
}

.animate-bounce-sideways {
  animation: bounce-sideways 1s infinite;
}

</style>


