import { zodResolver } from "@hookform/resolvers/zod";
import {
	Avatar,
	Button,
	Heading,
	MultiStep,
	Text,
	TextArea,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormAnnotation, ProfileBox } from "./styles";
import { Container, Header } from "../styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";
import { api } from "@/src/lib/axios";
import { useRouter } from "next/router";

const updateProfileSchema = z.object({ bio: z.string() });

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<UpdateProfileData>({
		resolver: zodResolver(updateProfileSchema),
	});

	const session = useSession();
	const router = useRouter();

	async function handleUpdateProfile(data: UpdateProfileData) {
		await api.put("/users/profile", {
			bio: data.bio,
		});
	}

	async function handleNavigateToNextStep() {
		await router.push(`/schedule/${session.data?.user.username}`);
	}

	return (
		<Container>
			<Header>
				<Heading as="strong">Wellcome to Ignite Call!</Heading>
				<Text>
					We need some info to create your profile. Hey, you can edit it after
					if needed!
				</Text>
				<MultiStep size={4} currentStep={4} />
			</Header>

			<ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
				<label>
					<Text size="sm">Profile picture</Text>
					<Avatar src={session.data?.user.avatar_url} />
				</label>

				<label>
					<Text size="sm">About you</Text>
					<TextArea {...register("bio")} />
					<FormAnnotation size="sm">
						Tell us a little bit about you. This will be shown on your profile.
					</FormAnnotation>
				</label>

				<Button
					onClick={handleNavigateToNextStep}
					type="submit"
					disabled={isSubmitting}
				>
					Conclude <ArrowRight />
				</Button>
			</ProfileBox>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(
		req,
		res,
		buildNextAuthOptions(req, res)
	);

	return { props: { session } };
};
