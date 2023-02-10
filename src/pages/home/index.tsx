import { Heading, Text } from "@ignite-ui/react";
import Image from "next/image";
import { Container, Hero, Preview } from "./styles";

import previewImage from "../../assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUserNameForm";

export default function Home() {
	return (
		<Container>
			<Hero>
				<Heading size="4xl">Easy scheduling</Heading>
				<Text size="xl">
					Connect your calendar and allow people to schedule things when you are
					free.
				</Text>
				<ClaimUsernameForm />
			</Hero>
			<Preview>
				<Image
					src={previewImage}
					height={400}
					quality={100}
					priority
					alt="Calendar is working as intended"
				/>
			</Preview>
		</Container>
	);
}
