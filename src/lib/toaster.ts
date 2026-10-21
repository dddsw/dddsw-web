import { createToaster } from '@skeletonlabs/skeleton-svelte';

/** Shared toast notifications; the matching <Toast.Group> is mounted once in the root layout. */
export const toaster = createToaster({ placement: 'bottom-end' });
