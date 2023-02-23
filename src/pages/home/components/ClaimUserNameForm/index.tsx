import { Button, TextInput, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormAnnotation } from "./styles";
import { useRouter } from "next/router";

const claimUserNameFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: "The username has to have three or more characters." })
		.regex(/^([a-z\\-\\_]+$)/i, {
			message: "Only letters, numbers, hyphens and underscores allowed.",
		})
		.transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUserNameFormSchema>;

export function ClaimUsernameForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ClaimUsernameFormData>({
		resolver: zodResolver(claimUserNameFormSchema),
	});

	const router = useRouter();

	async function handleClaimUsername(data: ClaimUsernameFormData) {
		const { username } = data;

		await router.push(`/register?username=${username}`);
	}

	return (
		<>
			<Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
				<TextInput
					size="sm"
					prefix="ignite.com/"
					placeholder="your-username"
					{...register("username")}
				/>
				<Button size="sm" type="submit" disabled={isSubmitting}>
					Reserve
					<ArrowRight></ArrowRight>
				</Button>
			</Form>
			<FormAnnotation>
				<Text size="sm">
					{errors.username ? errors.username.message : "Enter your username."}
				</Text>
			</FormAnnotation>
		</>
	);
}
