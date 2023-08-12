export const mintNft = async (address: string, authToken: string) => {

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("authorization", "Bearer "+authToken);
    myHeaders.append("content-type", "application/json");

    const raw = JSON.stringify({
        "attributes": {
            "sns": "wilfred-dev",
            "publicKey": address
        },
        "upsert": false,
        "name": "MSOL SNS",
        "symbol": "MSOL",
        "description": address,
        "receiverAddress": address,
        "delegated": false,
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg"
    });


    const res = await fetch("https://dev.underdogprotocol.com/v2/projects/3/nfts", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })

    return res.status

}