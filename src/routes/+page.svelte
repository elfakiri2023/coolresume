<script>
	import { currentPage } from '$lib/stores/general'
	import Features from '$lib/components/icons/Features.svelte'
	import StarUs from '$lib/components/ui/StarUs.svelte'

	currentPage.set('home')

	let features = [
		{
			title: 'Free Forever',
			description: 'Build stunning resumes for free, forever. Focus on landing your dream job, not your wallet.',
			icon: 'free'
		},
		{
			title: 'Easy to Customize',
			description: 'Drag & drop to create a professional resume in minutes. No design experience needed.',
			icon: 'customize'
		},
		{
			title: 'Mobile-Friendly',
			description: " Looks perfect on any device, phone to desktop. Perfect for today's job search.",
			icon: 'responsive'
		},
		{
			title: 'Share with Ease',
			description: 'One-click shareable link for easy applications. No bulky attachments.',
			icon: 'share'
		},
		{
			title: 'Your Data, Secure',
			description: 'We never share your info with 3rd parties. Your privacy is our priority.',
			icon: 'secure'
		},
		{
			title: 'Fast & Easy',
			description: 'Create a professional resume in just minutes. Get applying faster.',
			icon: 'fast'
		}
	]
</script>

<section class="relative">
	<div class="max-w-7xl mx-auto">
		<div class="pt-4 pb-4 md:pt-12 md:pb-2">
			<div class="text-center pb-5">
				<h1 class="text-gray-900 dark:text-gray-50 md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-5xl sm:text-4xl">
					Make your resume <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">cool</span> and get noticed
				</h1>
				<div class="max-w-6xl mx-auto">
					<p class="text-xl text-gray-900 dark:text-gray-50">Empower your career journey effortlessly with our intuitive resume builder. Craft, share, and showcase your professional story with ease, saving time and hassle.</p>
					<div class="pt-10 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
						<div>
							<a class="btn text-white bg-primary-600 hover:bg-primary-700 w-full mb-4 sm:w-auto sm:mb-0" href="/sign-up">Get started</a>
						</div>
						<div>
							<a class="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#features">Learn more</a>
						</div>
					</div>
					<div class="float relative h-full p-2 mt-12 overflow-hidden border rounded-3xl shadow-xl">
						<img src="/images/intro.png" alt="intro" class="object-cover h-full border shadow-2xl rounded-2xl" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="features" class="py-14 sm:py-14 pb-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:text-center">
			<p class="mt-2 font-bold tracking-tight text-gray-900 dark:text-gray-50 text-3xl sm:text-4xl">Features designed to help you win your dream job</p>
			<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Getting that dream job can seem like an impossible task. We’re here to change that.</p>
		</div>
		<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
			<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
				{#each features as feature}
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
							<div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
								<Features name={feature.icon} class="h-7 w-7 text-white" />
							</div>
							{feature.title}
						</dt>
						<dd class="mt-2 text-base leading-7 text-gray-700 dark:text-gray-300">{feature.description}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<footer class="py-5 text-center">
	<span>Proudly open source, Check us out on <a href="https://github.com/elfakiri2023/coolresume" class="text-primary-500 underline" target="_blank">GitHub</a></span>
</footer>

<StarUs />
