<script lang='ts'>
    import { signIn, signOut } from '@auth/sveltekit/client'
  	import { page } from '$app/stores'

	let loggedIn = $page.data.session?.user?.email;
	function handleClick() {
			if ($page.data.session?.user){
				signOut();
				loggedIn = false
			}else{
				signIn();
				loggedIn = true;
			}
			console.log(`$page.data.session?.user}`)
		}
</script>

<p>User: {$page.data.session?.user?.email}</p>
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to Skeleton.</h2>
	</div>
	<button class="btn btn-md variant-ghost-surface"
		on:click={handleClick}>
		{loggedIn ? 'Logout' : 'Login'}
	</button>
</div>

