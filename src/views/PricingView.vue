<script>
export default {
    data() {
        return {
            pricing: [
                {
                    title: "Pawn",
                    description: "Best if you just want to get those pesky ads away.",
                    cost: 2.99,
                    benefits: [
                        "No advertisements",
                        "Fancy badge",
                        "Up to 1000 lines of total code",
                        "Support ChessJS"
                    ]
                },
                {
                    title: "Rook",
                    description: "Best if you just love creating and share your new chess variants.",
                    cost: 5.99,
                    benefits: [
                        "No advertisements",
                        "Very fancy badge",
                        "Up to 10000 lines of total code",
                        "Multi-file variants",
                        "Expanded variant API",
                        "Support ChessJS"
                    ]
                },
                {
                    title: "Queen",
                    description: "Best if you love everything ChessJS and want to support us the most.",
                    cost: 8.99,
                    benefits: [
                        "No advertisements",
                        "Incredibly fancy badge",
                        "Up to 50000 lines of total code",
                        "Multi-file variants",
                        "Expanded variant API",
                        "Chess engine, with variant support",
                        "Support ChessJS"
                    ]
                }
            ]
        }
    }

}</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Love ChessJS?</h2>
                <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Like any other website, it's not
                    free to offer a service like this. Subscribing helps keep the site up, and in return, you get some
                    cool benefits.
                </p>
            </div>
            <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                <!-- Pricing Card -->
                <div v-for="tier in pricing"
                    class="justify-between flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <div>
                        <h3 class="mb-4 text-2xl font-semibold">{{ tier.title }}</h3>
                        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">{{ tier.description }}</p>
                        <div class="flex justify-center items-baseline my-8">
                            <span class="mr-2 text-5xl font-extrabold">${{ tier.cost }}</span>
                            <span class="text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <!-- List -->
                        <ul role="list" class="mb-8 space-y-4 text-left">
                            <li class="flex items-center space-x-3" v-for="benefit in tier.benefits">
                                <!-- Icon -->
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span>{{ benefit }}</span>
                            </li>
                        </ul>
                    </div>

                    <a href="#"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900">Subscribe</a>
                </div>
            </div>
        </div>
    </section>
</template>