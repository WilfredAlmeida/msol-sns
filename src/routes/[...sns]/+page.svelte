<script lang="ts">
	export let data;
	export let sns = '';
	export let publicKey = '';

	const jsonData = data.data;
	let showSnsCreated = false;

	if (data.status === 'MSOL_SNS_FOUND') {
		showSnsCreated = true;
		sns = jsonData[0].sns;
		publicKey = jsonData[0].publicKey;
	}

	const copyToClipboard = (name: string) => {
		console.log(name);

		const stringToCopy = name === 'btnSns' ? sns : publicKey;

		navigator.clipboard.writeText(stringToCopy);
	};
</script>

{#if showSnsCreated}
	<div class="mx-auto max-w-500 mt-20 w-full flex justify-center items-center">
		<div class="bg-gray-800 glassmorphic-6 shadow-lg rounded-lg p-8">
			<div class="flex justify-center">
				<h3 class="text-white text-3xl font-bold">SNS Exists</h3>
			</div>
			<div class="flex justify-center mt-5">
				<p class="text-white text-2xl font-bold">SNS:&nbsp;</p>
				<p class="text-green-400 text-2xl font-bold">{sns}</p>
				<button
					on:click|preventDefault={() => copyToClipboard('btnSns')}
					data-te-toggle="tooltip"
					title="Copy"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2v2M9 5a2 2 0 012-2h2a2 2 0 012 2v2M5 9h14M5 13h14M5 17h7"
						/>
					</svg>
				</button>
			</div>

			<div class="flex justify-center mt-5">
				<p class="text-white text-2xl font-bold">Public Key:</p>
			</div>
			<div class="flex justify-center mt-5">
				<p class="text-green-400 text-2xl font-bold">{publicKey}</p>
				<button
					on:click|preventDefault={() => copyToClipboard('btnPublicKey')}
					data-te-toggle="tooltip"
					title="Copy"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2v2M9 5a2 2 0 012-2h2a2 2 0 012 2v2M5 9h14M5 13h14M5 17h7"
						/>
					</svg>
				</button>
			</div>
		
		<div class="text-white text-1xl text-center m-3">
			<h3>Share on <a href="https://twitter.com/intent/tweet?text=Guess what I just created%3F 💳 My personalized Solana SNS from %40MsolSns! 🚀%0A%0AMSOL lets us create a short and easy-to-remember short name for our public keys and also gives us an NFT for it!%0A%0A🌥%EF%B8%8F Create your SNS at https%3A%2F%2Fmsol-sns.vercel.app%0A%0ACC%3A %40WilfredAlmeida_" target="_blank" class="text-green-400">Twitter</a></h3>
		</div>
		</div>
	</div>
{:else}
	<div class="mx-auto max-w-500 mt-20 w-full flex justify-center items-center">
		<div class="bg-gray-800 glassmorphic-6 shadow-lg rounded-lg p-8">
			<div class="flex justify-center">
				<h3 class="text-red-400 text-3xl font-bold">SNS Not Found</h3>
			</div>
		</div>
	</div>
{/if}
