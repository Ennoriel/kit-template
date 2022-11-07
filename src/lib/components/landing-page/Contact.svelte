<script>
	import { Button, ButtonGroup, EmailInput, Radio, TextArea, TextInput } from 'chyme-svelte';
	import Agreement from '../svg/Agreement.svelte';
	import Wrapper from './Wrapper.svelte';
	import LL from '$i18n/i18n-svelte';
</script>

<Wrapper col={2}>
	<Agreement alt="" maxwidth={300} />
	<div>
		<h2>{$LL.compo_contact_title()}</h2>

		<Radio
			label={$LL.compo_contact_services_label()}
			name="services"
			options={[
				$LL.compo_contact_services_option_assessment(),
				$LL.compo_contact_services_option_startup_app(),
				$LL.compo_contact_services_option_business_app()
			]}
		/>

		<Radio
			label={$LL.compo_contact_budget_label()}
			name="budget"
			options={[
				$LL.compo_contact_budget_option_low(),
				$LL.compo_contact_budget_option_medium(),
				$LL.compo_contact_budget_option_high()
			]}
		/>

		<div class="cols-2">
			<TextInput label={$LL.compo_contact_budget_name()} name="name" variant="square" />

			<EmailInput label={$LL.compo_contact_budget_email()} name="email" variant="square" />
		</div>

		<TextArea label={$LL.compo_contact_budget_details()} name="details" variant="square" />

		<ButtonGroup justify="center">
			<Button>{$LL.global_action_send()}</Button>
		</ButtonGroup>
	</div>
</Wrapper>

<style>
	.cols-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	@media (min-width: 768px) {
		h2 {
			margin: 0 0 32px;
		}
	}
</style>
