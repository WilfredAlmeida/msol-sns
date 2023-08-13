<script lang="ts">
	export let showSnsCreated = false;
	export let snsString = '';
	export let hasErrroed = false;
	export let errorString = '';
	export let isLoading = false;

	const formSubmit = async (event: { target: HTMLFormElement | undefined }) => {
		isLoading = true;

		const formData = new FormData(event.target);
		const sns = formData.get('sns');
		const publicKey = formData.get('public-key');

		if (!sns || !/^[A-Za-z0-9\-]{3,20}$/.test(`${sns}`))
			return alert(`SNS must 3 to 20 characters and only contain letters, numbers, and hyphens`);

		if (!publicKey) return alert(`Invalid Public Key`);

		const res = await fetch('/api/sns', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sns,
				publicKey
			})
		});

		const responseJson = await res.json();

		if (responseJson.status === 'MSOL_SNS_CREATED') {
			showSnsCreated = true;
			snsString = `/${sns}`;
			isLoading = false;
			return;
		}

		switch (responseJson.status) {
			case 'MSOL_SNS_EXISTS':
				errorString = 'SNS already exists';
				break;
			case 'MSOL_INPUT_INVALID':
				errorString = 'Invalid SNS or Public Key';
				break;
			case 'MSOL_INVALID_SNS':
				errorString = 'Invalid SNS';
				break;
			case 'MSOL_SOMETHING_WENT_WRONG':
				errorString = 'Something went wrong';
				break;
			default:
				errorString = 'Unknown Error';
				break;
		}
		hasErrroed = true;
        showSnsCreated = false;
		isLoading = false;
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(snsString);
	};

</script>

<div class="flex items-center justify-center m-10">
	<div class="text-white text-3xl text-center">
	  <h2>Create Short Name (SNS) for your Solana Public Key</h2>
	  <h3 class="text-green-400">Get an NFT for the SNS You Create</h3>
	</div>
  </div>
  

<div class="mx-auto max-w-500 mt-20 w-full flex justify-center items-center">
	<div class="bg-gray-800 glassmorphic-6 shadow-lg rounded-lg p-8">
		<form on:submit|preventDefault={formSubmit}>
			<div class="mb-6">
				<label class="text-white text-lg font-bold" for="sns">SNS</label>
				<input
					class="bg-gray-700 text-white border-gray-600 rounded-lg p-4 w-full"
					id="sns"
					name="sns"
					type="text"
					placeholder="Enter your SNS"
					required
				/>
			</div>
			<div class="mb-6">
				<label class="text-white text-lg font-bold" for="public-key">Public Key</label>
				<input
					class="bg-gray-700 text-white border-gray-600 rounded-lg p-4 w-full"
					id="public-key"
					name="public-key"
					type="text"
					placeholder="Enter your Public Key"
					required
				/>
			</div>

			{#if !isLoading}
            <div class="flex justify-center items-center">
				<button
					class="
        bg-gradient-to-bl from-purple-600 to-blue-300 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 active:scale-95
        "
					type="submit">Submit</button
				>
                </div>
			{:else}
            <div class="flex justify-center items-center">
                <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
              
              
			{/if}
		</form>
	</div>
</div>

{#if showSnsCreated}
	<div  class="mx-auto max-w-500 mt-20 w-full flex justify-center items-center">
		<div class="bg-gray-800 glassmorphic-6 shadow-lg rounded-lg p-8">
			<div class="flex justify-center">
				<div class="text-white text-3xl text-center">
				<h3 class="text-white text-3xl font-bold">SNS Created Successfully</h3>
				</div>
			</div>
			<div class="flex justify-center mt-5">
				<a target="_blank" href={snsString} class="text-green-400 text-2xl font-bold"
					>{`${window.location.origin.split('//')[1] + snsString}`}</a
				>
				<button on:click|preventDefault={copyToClipboard} data-te-toggle="tooltip" title="Copy">
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
			<h3>Check your wallet for a cool NFT</h3>
			</div>
		</div>
	</div>
{/if}

{#if hasErrroed}
	<div class="mx-auto max-w-500 mt-20 w-full flex justify-center items-center">
		<div class="bg-gray-800 glassmorphic-6 shadow-lg rounded-lg p-8">
			<div class="flex justify-center">
				<h3 class="text-red-400 text-3xl font-bold">{errorString}</h3>
			</div>
		</div>
	</div>
{/if}
