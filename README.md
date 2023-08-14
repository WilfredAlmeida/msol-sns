<p align="center"><img src="https://github.com/WilfredAlmeida/msol-sns/assets/60785452/67f8d0bc-ae22-4abe-9588-897fa42ec7da"/></p>


# MSOL SNS

[MSOL](https://msol-sns.vercel.app/) is a Short Name Service (SNS) for Solana that gives you an easy-to-remember alias of your choice for your Solana Public Key.

MSOL also gives you an NFT for the SNS you create as proof that you own it.

An SNS can be up to 20 characters long and can have letters, numbers, and hyphens. For eg. `foo-bar`

MSOL uses [Vercel KV](https://vercel.com/docs/storage/vercel-kv) Redis database to store the SNS making it fast with average SNS lookup times of ~250ms.

## Demo
![msol-demo](https://github.com/WilfredAlmeida/msol-sns/assets/60785452/36f50a0e-d895-4ae0-b343-5f273e925fef)



## Public Key Lookup
There are 2 ways to lookup your key:
1. The web portal: In your browser, visiting `<base-url>/<sns>` will show you on the website whether the SNS exists or not.  

2. Via API: To get the API key via an API call, hit the `<base-url>/api/sns?sns=<your-sns>`. For eg.  
```curl
curl --location 'http://localhost:5173/api/sns?sns=foo-bar'
```

Sample Response
1. SNS Found
```json
{
    "status": "MSOL_SNS_FOUND",
    "data": [
        {
            "publicKey": "<public-key>",
            "sns": "foo-bar"
        }
    ],
    "error": null
}
```

2. SNS Not Found
```json
{
    "status": "MSOL_SNS_NOT_FOUND",
    "data": null,
    "error": null
}
```


## Supporting MSOL
MSOL aims to take away the hassle of remembering your Solana Public Key.

MSOL aims to always remain free for its users.

Due to a lack of financial resources, MSOL currently supports only Solana Devnet.

Please get in touch if you want to support MSOL.

Costs to be covered for now are:  
- Vercel for hosting & KV DB
- Underdog for NFT
- Images for NFTs
- Domain

