import { getDaysOfTheWeek } from "@/src/utils/get-days-of-the-week";
import {
	Button,
	Checkbox,
	Heading,
	MultiStep,
	Text,
	TextInput,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Container, Header } from "../styles";
import {
	IntervalBox,
	IntervalDay,
	IntervalInputs,
	IntervalItem,
	IntervalsContainer,
} from "./styles";

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
	const {
		register,
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({
		defaultValues: {
			intervals: [
				{
					dayOfTheWeek: 0,
					enabled: false,
					startTime: "09:00",
					endTime: "17:00",
				},
				{
					dayOfTheWeek: 1,
					enabled: true,
					startTime: "09:00",
					endTime: "17:00",
				},
				{
					dayOfTheWeek: 2,
					enabled: true,
					startTime: "09:00",
					endTime: "17:00",
				},
				{
					dayOfTheWeek: 3,
					enabled: true,
					startTime: "09:00",
					endTime: "17:00",
				},
				{
					dayOfTheWeek: 4,
					enabled: true,
					startTime: "09:00",
					endTime: "17:00",
				},
				{
					dayOfTheWeek: 5,
					enabled: true,
					startTime: "09:00",
					endTime: "17:00",
				},
				{
					dayOfTheWeek: 6,
					enabled: false,
					startTime: "09:00",
					endTime: "17:00",
				},
			],
		},
	});

	const daysOfTheWeek = getDaysOfTheWeek();

	const { fields } = useFieldArray({ control, name: "intervals" });

	async function handleSetTimeIntervals() {}

	return (
		<Container>
			<Header>
				<Heading as="strong">Almost there</Heading>
				<Text>Tell us what is your availability throughout the days.</Text>
				<MultiStep size={4} currentStep={3} />
			</Header>

			<IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
				<IntervalsContainer>
					{fields.map((field) => {
						return (
							<IntervalItem key={field.id}>
								<IntervalDay>
									<Checkbox />
									<Text>{daysOfTheWeek[field.dayOfTheWeek]}</Text>
								</IntervalDay>
								<IntervalInputs>
									<TextInput size="sm" type="time" step={60} />
									<TextInput size="sm" type="time" step={60} />
								</IntervalInputs>
							</IntervalItem>
						);
					})}
				</IntervalsContainer>

				<Button type="submit">
					Next step <ArrowRight />
				</Button>
			</IntervalBox>
		</Container>
	);
}
