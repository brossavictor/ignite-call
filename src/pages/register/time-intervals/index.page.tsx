import { api } from "@/src/lib/axios";
import { convertTimeStringToMinutes } from "@/src/utils/convert-time-string-to-minutes";
import { getDaysOfTheWeek } from "@/src/utils/get-days-of-the-week";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Checkbox,
	Heading,
	MultiStep,
	Text,
	TextInput,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { Container, Header } from "../styles";
import {
	IntervalBox,
	IntervalDay,
	IntervalInputs,
	IntervalItem,
	IntervalsContainer,
	FormError,
} from "./styles";

const timeIntervalsFormSchema = z.object({
	intervals: z
		.array(
			z.object({
				dayOfTheWeek: z.number().min(0).max(6),
				enabled: z.boolean(),
				startTime: z.string(),
				endTime: z.string(),
			})
		)
		.length(7)
		.transform((intervals) =>
			intervals.filter((intervals) => intervals.enabled)
		)
		.refine((intervals) => intervals.length > 0, {
			message: "You have to select at least a day of the week.",
		})
		.transform((intervals) => {
			return intervals.map((interval) => {
				return {
					dayOfTheWeek: interval.dayOfTheWeek,
					startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
					endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
				};
			});
		})
		.refine(
			(intervals) => {
				return intervals.every(
					(interval) =>
						interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
				);
			},
			{
				message: "Invalid input.",
			}
		),
});

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(timeIntervalsFormSchema),
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

	const intervals = watch("intervals");

	async function handleSetTimeIntervals(data: any) {
		const formData = data as TimeIntervalsFormData;

		await api.post("/users/time-intervals", { intervals });
	}

	return (
		<Container>
			<Header>
				<Heading as="strong">Almost there</Heading>
				<Text>Tell us what is your availability throughout the days.</Text>
				<MultiStep size={4} currentStep={3} />
			</Header>

			<IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
				<IntervalsContainer>
					{fields.map((field, index) => {
						return (
							<IntervalItem key={field.id}>
								<IntervalDay>
									<Controller
										name={`intervals.${index}.enabled`}
										control={control}
										render={({ field }) => {
											return (
												<Checkbox
													onCheckedChange={(checked) => {
														field.onChange(checked === true);
													}}
													checked={field.value}
												/>
											);
										}}
									></Controller>
									<Text>{daysOfTheWeek[field.dayOfTheWeek]}</Text>
								</IntervalDay>
								<IntervalInputs>
									<TextInput
										size="sm"
										type="time"
										step={60}
										disabled={intervals[index].enabled === false}
										{...register(`intervals.${index}.startTime`)}
									/>
									<TextInput
										size="sm"
										type="time"
										step={60}
										disabled={intervals[index].enabled === false}
										{...register(`intervals.${index}.endTime`)}
									/>
								</IntervalInputs>
							</IntervalItem>
						);
					})}
				</IntervalsContainer>

				{errors.intervals && (
					<FormError size="sm">{errors.intervals.message}</FormError>
				)}

				<Button type="submit" disabled={isSubmitting}>
					Next step <ArrowRight />
				</Button>
			</IntervalBox>
		</Container>
	);
}
