<template>
	<div class="panel panel-warning">
		<div class="panel-heading">
			<h3 class="panel-title">
				{{  }}
			</h3>
		</div>
		<div class="panel-body" style="word-wrap: break-word">
			<p>tokenId : {{ token.tokenId }}</p>
			<p>balance : {{ token.balance }}</p>
			<p>freezeStatus: {{ token.freezeStatus }}</p>
			<p>hbarBalance: {{ token.hbarBalance }}</p>
			<p>kycStatus: {{ token.kycStatus }}</p>
			<p>accountId: {{ token.treasury }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				account: this.$store.getters.getCurrentAccount
			}
		},
		methods: {
			// getWallet(accountId) {
			// 	this.$store.getters.getAccounts
			// }
		},
		props: ['token']
	}
</script>

<style scoped>

</style>