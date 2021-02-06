import { operatorClient } from "@/service/client";
import { AccountCreateTransaction, Hbar, PrivateKey } from "@hashgraph/sdk";

export async function accountCreate(wallet) {
    const client = operatorClient();

    try {
        const privateKey = await PrivateKey.generate();

        const response = await new AccountCreateTransaction()
            .setKey(privateKey.publicKey)
            .setInitialBalance(new Hbar(process.env.VUE_APP_INITIAL_BALANCE))
            // .setInitialBalance(Hbar.fromTinybars(process.env.VUE_APP_INITIAL_BALANCE))
            .execute(client);

        const receipt = await response.getReceipt(client);
        const newAccountId = receipt.accountId;

        return {
            accountId: newAccountId.toString(),
            wallet: wallet,
            privateKey: privateKey.toString(),
            tokenRelationships: {}
        };
    } catch (err) {
        console.log('accountCreate.js accountCreate error');
        console.error(err)
        return {};
    }
}