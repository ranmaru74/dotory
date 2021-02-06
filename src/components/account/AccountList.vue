<template>
	<div>
		<ul class="list-group">
			<li class="list-group-item" v-for="account in accounts" :key="account.accountId">{{ account.account.wallet }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				accounts: this.$store.getters.getAccounts
			}
		}
	}
</script>

<style scoped>

</style>