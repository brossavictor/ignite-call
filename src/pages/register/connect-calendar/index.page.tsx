import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { AuthError, ConnectItem, ConnextBox } from "./styles";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
//import { api } from "@/src/lib/axios";

export default function ConnectCalendar() {
	const session = useSession();
	const router = useRouter();

	const hasAuthError = !!router.query.error;
	const isSignedIn = session.status === "authenticated";

	async function handleConnectCalendar() {
		await signIn("google");
	}

	return (
		<Container>
			<Header>
				<Heading as="strong">Connect yourself!</Heading>
				<Text>
					Connect your calendar in order to automatically update your schedule.
				</Text>
				<MultiStep size={4} currentStep={2} />
			</Header>

			<ConnextBox>
				<ConnectItem>
					<Text>Google Calendar</Text>
					{isSignedIn ? (
						<Button size="sm" disabled>
							Connected <Check />
						</Button>
					) : (
						<Button
							variant="secondary"
							size="md"
							onClick={handleConnectCalendar}
						>
							Connect
							<ArrowRight />
						</Button>
					)}
				</ConnectItem>

				{hasAuthError && (
					<AuthError size="sm">
						Error connecting with Google. Check if you have given permission to
						have access to Google Calendar.
					</AuthError>
				)}

				<Button type="submit" disabled={!isSignedIn}>
					Next step
					<ArrowRight />
				</Button>
			</ConnextBox>
		</Container>
	);
}
