import { getRandomImageUrl } from "./image";

export const mintNft = async (address: string, authToken: string, sns: string) => {

    const imageUrl = await getRandomImageUrl();

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("authorization", "Bearer "+authToken);
    myHeaders.append("content-type", "application/json");

    const raw = JSON.stringify({
        "attributes": {
            "sns": sns,
            "publicKey": address,
            "created": Date.now()
        },
        "upsert": false,
        "name": "MSOL SNS",
        "symbol": "MSOL",
        "description": address,
        "receiverAddress": address,
        "delegated": false,
        "image": imageUrl
    });


    const res = await fetch("https://dev.underdogprotocol.com/v2/projects/3/nfts", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })

    return res.status

}