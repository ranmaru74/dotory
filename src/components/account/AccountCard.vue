<template>
	<div class="panel panel-success">
		<div class="panel-heading">
			<h3 class="panel-title">
				{{ account.account.wallet }}
			</h3>
		</div>
		<div class="panel-body" style="word-wrap: break-word">
			<p>Account Id : {{ account.accountId }} </p>
			<p>Private Key : {{ account.account.privateKey }}</p>
			<p>HBar Balance : {{ balance }}</p>
		</div>
	</div>
</template>

<script>
	import { accountGetBalance, accountGetInfo } from "@/service/accountInfo";

	export default {
		props: ['account'],
		data() {
			return {
				balance: '',
				message: ''
			}
		},
		methods: {
			async getInfo() {
				// const balance = await accountGetBalance(this.account.accountId);
				// console.log('balance : ' + balance);
				// console.log('AccountCard.vue getInfo()');
				const tokenRelationships = await accountGetInfo(this.account.accountId);
				this.account.tokenRelationships = tokenRelationships;

				console.log(tokenRelationships);
				for(const key in tokenRelationships) {
					const relationship = tokenRelationships[key];
					console.log(relationship.hbarBalance);
				}
				this.balance = tokenRelationships.hbarBalance;
			}
		},
		created() {
			EventBus.$on("notify", notification => {
				this.message = notification.message;
				console.log(this.message);
			});
			this.getInfo();
		}
	}
</script>

<style scoped>

</style>