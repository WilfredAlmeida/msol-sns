import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {

	const snsArr = params.sns.split('/');

    const snsParam = snsArr[0];
    
    const res = await fetch(`/api/sns?sns=${snsParam}`);

    const json = await res.json();

    return json;
};