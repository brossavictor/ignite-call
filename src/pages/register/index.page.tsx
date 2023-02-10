import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Form, Header } from "./styles";

export default function Regiser() {
	return (
		<Container>
			<Header>
				<Heading as="strong">Wellcome to Ignite Call!</Heading>
				<Text>
					We need some info to create your profile. Hey, you can edit it after
					if needed!
				</Text>
				<MultiStep size={4} currentStep={1} />
			</Header>
			<Form as="form">
				<label>
					<Text as="span" size="sm">
						Username
					</Text>
					<TextInput
						prefix="ignite.com/"
						placeholder="your-username"
					></TextInput>
				</label>

				<label>
					<Text as="span" size="sm">
						Full name
					</Text>
					<TextInput placeholder="Your name"></TextInput>
				</label>

				<Button type="submit">
					Next step <ArrowRight />
				</Button>
			</Form>
		</Container>
	);
}
