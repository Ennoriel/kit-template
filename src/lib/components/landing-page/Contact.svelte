<script>
	import { Button, Radio, TextArea, TextInput } from "chyme-svelte";
	import Agreement from "../svg/Agreement.svelte";
	import Wrapper from "./Wrapper.svelte";
</script>

<Wrapper col={2}>
    <Agreement alt="" maxwidth={300} />
    <div>
        <h2>Let's collaborate!</h2>

        <Radio
            label="Services"
            name="services"
            options={["Assesment", "Start-up app", "Business app" ]}
        />

        <Radio
            label="Budget in euro"
            name="budget"
            options={[ "5k - 10k", "10k - 25k", "More than 25k" ]}
        />

        <div class="cols-2">
            <TextInput
                label="Name"
                name="name"
                variant="square"
            />

            <TextInput
                label="Email"
                name="email"
                variant="square"
            />
        </div>

        <TextArea
            label="Details"
            name="details"
            variant="square"
        />

        <Button>Send</Button>
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