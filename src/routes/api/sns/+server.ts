import { json } from "@sveltejs/kit";
import { kv, createClient } from "@vercel/kv";
// import { $env } from '@sveltejs/kit';

import {KV_REST_API_URL, KV_REST_API_TOKEN} from "$env/static/private"
const snsDb = createClient({
    url: KV_REST_API_URL,
    token: KV_REST_API_TOKEN,
});

export async function POST({request}){
    const body = await request.json()
    const {publicKey, sns} = body
    if(!publicKey || !sns){
        return json(
			{ message: 'Invalid sns or publicKey' },
			{
				status: 400
			}
		);
    }

    if((`${sns}`).trim().length > 20){
        return json(
			{ message: 'Invalid sns. sns cannot be more than 20 characters.' },
			{
				status: 400
			}
		);
    }

    // TODO: add public key validation

    const res = await snsDb.set(`${sns}`,`${publicKey}`)

    if(!res){
        return json(
            {message: "Something went wrong. Please try again"},
            {
                status: 500
            }
        )
    }

    console.log(res);
    
    return json(
        {message: "SNS successfully created."},
        {
            status: 201
        }
    )

}

export async function GET({params, url}){
    console.log("PARAMS");
    console.log(params);
    
    const sns = url.searchParams.get("sns");
    console.log(sns);
    if(!sns){
        return json(
			{ message: 'Invalid sns' },
			{
				status: 400
			}
		);
    }

    const res = await snsDb.get(sns)
    console.log(res);
    

    if(!res){
        return json(
			{ message: 'sns not found' },
			{
				status: 404
			}
		);
    }

    return json(
        { message: 'sns found', data:[{publicKey: res, sns}] },
        {
            status: 404
        }
    );
    
}