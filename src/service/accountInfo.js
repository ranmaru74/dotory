import { operatorClient } from "@/service/client";
import { AccountInfoQuery, AccountBalanceQuery, Hbar } from "@hashgraph/sdk";


export async function accountGetInfo(accountId) {
    console.log('accountInfo.js accountGetInfo : ' + accountId);
    const client = operatorClient();

    try {

        let tokenRelationships = {};
        const info = await new AccountInfoQuery()
            .setQueryPayment(Hbar.fromTinybars(30))
            .setAccountId(accountId)
            .execute(client)

        console.log(info);
        const hBarBalance = info.balance;
        console.log('accountInfo.js hBarBalance : ' + hBarBalance);
        for (let key of info.tokenRelationships.keys()) {
            const tokenRelationship = {
                tokenId: key.toString(),
                hbarBalance: hBarBalance.toString(),
                balance: info.tokenRelationships.get(key).balance.toString(),
                freezeStatus: info.tokenRelationships.get(key).isFrozen,
                kycStatus: info.tokenRelationships.get(key).isKycGranted,
                treasury: accountId
            };
            tokenRelationships[key] = tokenRelationship;
        }

        return tokenRelationships;
    } catch (err) {
        return undefined;
    }
}

export async function accountGetBalance(accountId) {
    const client = operatorClient();

    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);

    // return accountBalance.hbars.toTinybars()
    return accountBalance.hbars.toString();
}