import { Button, TextInput, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormAnnotation } from "./styles";

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
		formState: { errors },
	} = useForm<ClaimUsernameFormData>({
		resolver: zodResolver(claimUserNameFormSchema),
	});

	async function handleClaimUsername(data: ClaimUsernameFormData) {
		console.log(data);
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
				<Button size="sm" type="submit">
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
