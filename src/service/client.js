import { Client } from "@hashgraph/sdk";

export function operatorClient() {
    const operatorAccount = process.env.VUE_APP_OPERATOR_ID
    const operatorPrivateKey = process.env.VUE_APP_OPERATOR_KEY

    if(!checkProvided(operatorAccount) || !checkProvided(operatorPrivateKey)) {
        throw new Error(
            "environment variables VUE_APP_OPERATOR_KEY and VUE_APP_OPERATOR_ID must be present"
        );
    }

    return getClient(operatorAccount, operatorPrivateKey)
}

export function getClient(account, privateKey) {
    if(!checkProvided(process.env.VUE_APP_NETWORK)) {
        throw new Error("VUE_APP_NETWORK must be set in environment")
    }

    let client;
    switch (process.env.VUE_APP_NETWORK.toUpperCase()) {
        case "TESTNET":
            client = Client.forTestnet();
            break;
        case "MAINNET":
            client = Client.forMainnet();
            break;
        default:
            throw new Error('VUE_APP_NETWORK must be "testnet" or "mainnet"');
    }
    client.setOperator(account, privateKey);
    return client;
}

function checkProvided(environmentVariable) {
    if(environmentVariable === null) {
        return false;
    }

    if(typeof environmentVariable === "undefined") {
        return false;
    }

    return true;
}