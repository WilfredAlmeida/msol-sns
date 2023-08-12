import { json } from "@sveltejs/kit";
import { kv, createClient } from "@vercel/kv";

import { KV_REST_API_URL, KV_REST_API_TOKEN } from "$env/static/private"
import { HttpResponseCode, MsolStatusCodes } from "../utils/constants.js";
const snsDb = createClient({
    url: KV_REST_API_URL,
    token: KV_REST_API_TOKEN,
});

export async function POST({ request }) {
    const body = await request.json()
    const { publicKey, sns } = body
    if (!publicKey || !sns) {
        return json(
            {
                status: MsolStatusCodes.MSOL_INPUT_INVALID,
                data: null,
                error: [{ message: 'Invalid sns or publicKey' }]
            },
            {
                status: HttpResponseCode.BAD_REQUEST
            }
        );
    }

    if ((`${sns}`).trim().length > 20) {
        return json(
            {
                status: MsolStatusCodes.MSOL_INPUT_INVALID,
                data: null,
                error: [{ message: 'Invalid sns. sns cannot be more than 20 characters.' }]
            },
            {
                status: HttpResponseCode.BAD_REQUEST
            }
        );
    }

    // TODO: add public key validation

    const snsExists = await snsDb.exists(`${sns}`)
    if(snsExists && snsExists > 0){
        return json({
            status: MsolStatusCodes.MSOL_SNS_EXISTS,
            data: null,
            error: null
        },
        {
            status: HttpResponseCode.BAD_REQUEST
        })
    }

    const res = await snsDb.set(`${sns}`, `${publicKey}`)

    if (!res) {
        return json(
            {
                status: MsolStatusCodes.MSOL_SOMETHING_WENT_WRONG,
                data: null,
                error: [{ message: 'Something went wrong. Please try again' }],
            },
            {
                status: HttpResponseCode.INTERNAL_SERVER_ERROR
            }
        )
    }

    console.log(res);

    return json(
        {
            status: MsolStatusCodes.MSOL_SNS_CREATED,
            data: null,
            error: null
        },
        {
            status: HttpResponseCode.CREATED
        }
    )

}

export async function GET({ url }) {

    const sns = url.searchParams.get("sns");
    console.log(sns);

    if (!sns) {
        return json(
            {
                status: MsolStatusCodes.MSOL_INPUT_INVALID,
                data: null,
                error: [{ message: 'Invalid sns' }]
            },
            {
                status: HttpResponseCode.BAD_REQUEST
            }
        );
    }

    const res = await snsDb.get(sns)
    console.log(res);


    if (!res) {
        return json(
            {
                status: MsolStatusCodes.MSOL_SNS_NOT_FOUND,
                data: null,
                error: null
            },
            {
                status: HttpResponseCode.NOT_FOUND
            }
        );
    }

    return json(
        {
            status: MsolStatusCodes.MSOL_INPUT_INVALID,
            data: [{ publicKey: res, sns }],
            error: null
        },
        {
            status: HttpResponseCode.SUCCESS
        }
    );

}