import {
    TokenCreateTransaction,
    PrivateKey,
    TokenInfoQuery,
    Hbar,
    Status, TokenAssociateTransaction
} from "@hashgraph/sdk";
import { getClient, operatorClient } from "@/service/client";
import { notifyError, notifySuccess } from "@/utils";
import store from '@/store/store'

export async function tokenCreate(account, token) {
    let tokenResponse = {}
    const autoRenewPeriod = 7776000;
    try {
        let sigKey = PrivateKey.fromString(token.key);
        const tx = await new TokenCreateTransaction();
        tx.setTokenName(token.name);
        tx.setTokenSymbol(token.symbol.toUpperCase());
        tx.setDecimals(token.decimals);
        tx.setInitialSupply(token.initialSupply);
        tx.setTreasuryAccountId(token.treasury);
        tx.setAutoRenewAccountId(token.autoRenewAccount);
        tx.setAutoRenewPeriod(autoRenewPeriod);

        tx.setAdminKey(sigKey.publicKey);
        tx.setKycKey(sigKey.publicKey);
        tx.setFreezeKey(sigKey.publicKey);
        tx.setFreezeDefault(true);
        tx.setWipeKey(sigKey.publicKey);
        // tx.setSupplyKey(sigKey.publicKey);

        console.log('tokenCreate account');
        console.log(account.accountId);
        console.log(account.account.privateKey);

        const client = getClient(account.accountId, account.account.privateKey);

        await tx.signWithOperator(client);
        await tx.sign(sigKey);


        console.log('1');
        const response = await tx.execute(client);
        console.log('2');

        const transactionReceipt = await response.getReceipt(client);

        if (transactionReceipt.status !== Status.Success) {
            console.log('transaction failed');
            notifyError(transactionReceipt.status.toString());
        } else {
            token.tokenId = transactionReceipt.tokenId;

            // Todo: make transaction

            const tokenInfo = await tokenGetInfo(token);

            tokenResponse = {
                tokenId: token.tokenId.toString(),
                symbol: token.symbol.toUpperCase(),
                name: token.name,
                totalSupply: token.initialSupply,
                decimals: token.decimals,
                autoRenewAccount: account.accountId.toString(),
                autoRenewPeriod: autoRenewPeriod,
                defaultFreezeStatus: token.defaultFreezeStatus,
                kycKey: token.kycKey,
                wipeKey: token.wipeKey,
                freezeKey: token.freezeKey,
                adminKey: token.adminKey,
                supplyKey: token.supplyKey,
                expiry: tokenInfo.expiry,
                isDeleted: false,
                treasury: account.accountId.toString()
            }

            notifySuccess("token create successful");
        }
        return tokenResponse;
    } catch (err) {
        console.log(err.message);
        return {};
    }
}

export async function tokenGetInfo(token) {
    const client = operatorClient();
    const tokenResponse = token;
    try {
        const info = await new TokenInfoQuery()
            .setMaxQueryPayment(Hbar.fromTinybars(30))
            .setTokenId(token.tokenId)
            .execute(client)

        tokenResponse.totalSupply = info.totalSupply;
        tokenResponse.expiry = info.expirationTime.toDate();
    } catch (err) {
        notifyError(err.message);
    }

    return tokenResponse;
}

export async function tokenAssociate(tokenId, account) {
    const tx = await new TokenAssociateTransaction();

    const client = getClient(account.accountId, account.privateKey);

    const userKey = PrivateKey.fromString(account.privateKey);

    try {
        tx.setTokenIds([tokenId]);
        tx.setAccountId(account.accountId);

        await tx.signWithOperator(client);
        await tx.sign(userKey);

        const response = await tx.execute(client);

        const transactionReceipt = await response.getReceipt(client);
        if(transactionReceipt.status !== Status.Success) {
            notifyError(transactionReceipt.status.toString());
            return {
                status: false
            }
        }

        notifySuccess("token association successful");
        return {
            status: true,
            transactionId: response.transactionId.toString()
        };
    } catch (err) {
        notifyError(err.message);
        return {
            status: false
        };
    }
}