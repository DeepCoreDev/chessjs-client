<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="max-w-screen-md mb-8 lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Ever wanted to
                    play Chess, but with your own rules?</h2>
                <p class="text-gray-500 sm:text-xl dark:text-gray-400">ChessJS uses variants, special scripts written in
                    JavaScript, to modify how the game is played. Any user can create and code their own variants. </p>
            </div>
            <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <font-awesome-icon icon="fa-solid fa-code" class="text-white" />
                    </div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">Simple</h3>
                    <p class="text-gray-500 dark:text-gray-400">Variants use JavaScript, an easy to learn and use
                        programming language.</p>
                </div>
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <font-awesome-icon icon="fa-solid fa-people-group" class="text-white" />
                    </div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">Multiplayer</h3>
                    <p class="text-gray-500 dark:text-gray-400">Normal Chess is between two players, but ChessJS
                        supports up to 8 people playing in the same game!</p>
                </div>
                <div>
                    <div
                        class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                        <font-awesome-icon icon="fa-solid fa-robot" class="text-white" />
                    </div>
                    <h3 class="mb-2 text-xl font-bold dark:text-white">Engine</h3>
                    <p class="text-gray-500 dark:text-gray-400">ChessJS can even build an engine, that tells you the
                        best moves for your variant. </p>
                    <p class="text-sm text-gray-400 dark:text-gray-500">Only available to subscribed members</p>

                </div>
            </div>
        </div>
    </section>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
            <h2
                class="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
                Check us out on other platforms</h2>
            <div
                class="grid grid-cols-1 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-3 dark:text-gray-400">
                <a href="https://discord.gg/dRgtDTJMx4" target="_blank" class="flex justify-center items-center">
                    <img :src="`/${$store.state.color}/discord.svg`" />
                </a>
                <a href="/about" class="flex justify-center items-center">
                    <img :src="`/${$store.state.color}/kickstarter.png`" />
                </a>
                <a href="https://www.reddit.com/r/chessjs/" target="_blank" class="flex justify-center items-center">
                    <img :src="`/${$store.state.color}/reddit.svg`" />
                </a>
            </div>
        </div>
    </section>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked
                questions</h2>
            <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                <div>
                    <div class="mb-10">
                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            What is a "variant"?
                        </h3>
                        <p class="text-gray-500 dark:text-gray-400">A variant is what we call the code behind the game.
                            You, or somebody else, has written some JavaScript, that interacts with ChessJS, to tell us
                            what are legal moves, how the game ends, how many players, etc...</p>
                    </div>
                    <div class="mb-10">
                        <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                            <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            How do I create a variant?
                        </h3>
                        <p class="text-gray-500 dark:text-gray-400">ChessJS has written extensive documentation on how
                            the variant system works, and how to implement your idea. You can find it <a href="#"
                                class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                                target="_blank" rel="noreferrer">here</a>.</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    metaInfo: {
        title: "About"
    }
}
</script>