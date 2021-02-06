<template>
	<div class="row">
		<div class="col-sm-5 col-md-5">
			<h3>My account</h3>
			<hr>
			<div class="row">
				<app-account-card v-if="myAccount.accountId" :account="myAccount"></app-account-card>
			</div>
		</div>
		<div class="col-sm-5 col-sm-offset-1">
			<h3>My token</h3>
			<hr>
			<app-token-list :accountIds="[myAccount.accountId]"></app-token-list>
		</div>
	</div>
</template>

<script>
	import AccountCard from "@/components/account/AccountCard";
	import TokenList from "@/components/token/TokenList";

	export default {
		data() {
			return {
				myAccount: this.$store.getters.getCurrentAccount,
			}
		},
		components: {
			appAccountCard: AccountCard,
			appTokenList: TokenList
		},
		created() {
			if (this.myAccount.accountId === undefined) {
				this.$router.push('/login')
			}
		}

	}
</script>

<style scoped>

</style>