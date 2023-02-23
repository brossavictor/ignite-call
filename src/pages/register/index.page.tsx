import { api } from "@/src/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { Container, Form, FormError, Header } from "./styles";

const registerFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: "The username has to have three or more characters." })
		.regex(/^([a-z\\-\\_]+$)/i, {
			message: "Only letters, numbers, hyphens and underscores allowed.",
		})
		.transform((username) => username.toLowerCase()),
	name: z
		.string()
		.min(3, { message: "The name has to have three or more characters." }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const router = useRouter();

	useEffect(() => {
		if (router.query.username) {
			setValue("username", String(router.query.username));
		}
	}, [router.query?.username, setValue]);

	async function handleRegister(data: RegisterFormData) {
		try {
			await api.post("/users", { name: data.name, username: data.username });
			await router.push("/register/connect-calendar");
		} catch (err) {
			if (err instanceof AxiosError && err?.response?.data?.message) {
				alert(err.response.data.message);
				return;
			}

			console.log(err);
		}
	}

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

			<Form as="form" onSubmit={handleSubmit(handleRegister)}>
				<label>
					<Text size="sm">Username</Text>
					<TextInput
						prefix="ignite.com/"
						placeholder="your-username"
						{...register("username")}
					></TextInput>

					{errors.name && (
						<FormError size="sm">{errors.username?.message}</FormError>
					)}
				</label>

				<label>
					<Text size="sm">Full name</Text>
					<TextInput placeholder="Your name" {...register("name")}></TextInput>
					{errors.name && (
						<FormError size="sm">{errors.name?.message}</FormError>
					)}
				</label>

				<Button type="submit" disabled={isSubmitting}>
					Next step <ArrowRight />
				</Button>
			</Form>
		</Container>
	);
}
