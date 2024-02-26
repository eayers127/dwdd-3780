import { browser } from '$app/environment';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const themeStore: Writable<string> = localStorageStore(
    'theme', browser ? document.body.dataset.theme ?? 'skeleton' : 'skeleton'
    );

themeStore.subscribe((value) => {
    if(browser) {
        document.body.dataset.theme = value as string;
    }
})