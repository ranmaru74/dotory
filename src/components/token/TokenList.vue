<template>
	<div>
		<app-token-card v-for="token in tokens" :key="token.tokenId" :token="token"></app-token-card>
	</div>
</template>

<script>
	import TokenCard from "@/components/token/TokenCard";
	import { accountGetInfo } from "@/service/accountInfo";

	export default {
		data() {
			return {
				tokens: []
			}
		},
		props: ['accountIds'],
		methods: {
			async getTokens() {
				console.log('getTokens')
				console.log(this.accountIds);
				const resultTokens = [];
				for(const accountId of this.accountIds) {
					console.log('start for : ' + accountId);
					const tokenRelationships = await accountGetInfo(accountId);
					for(const key in tokenRelationships) {
						const tokenRelationship = tokenRelationships[key];
						console.log('tokenRelationship');
						console.log(tokenRelationship);
						// this.tokens.push(tokenRelationship);
						resultTokens.push(tokenRelationship);
					}
				}

				console.log('result');
				console.log(resultTokens);
				this.tokens = resultTokens;
			}
		},
		components: {
			appTokenCard: TokenCard
		},
		created() {
			this.getTokens()
		}
	}
</script>

<style scoped>

</style>