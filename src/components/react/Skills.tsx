import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Cell,
	Tooltip,
} from 'recharts';
import Blinker from './Blinker';

import styles from './Skills.module.css';

type TTooltipPayload = { payload: (typeof data)[number] }[] | undefined;
type TCustomTooltipProps = {
	active: boolean | undefined;
	payload: TTooltipPayload;
};

const ADVANCED = 'Advanced';
const INTERMEDIATE_TO_ADVANCED = 'Intermediate to Advanced';
const INTERMEDIATE = 'Intermediate';
const BEGINNER_TO_INTERMEDIATE = 'Beginner to Intermediate';

const data = [
	{
		name: 'TS/JS',
		skillset: ADVANCED,
		value: 85,
	},
	{
		name: 'React',
		skillset: ADVANCED,
		value: 85,
	},
	{ name: 'HTML', skillset: INTERMEDIATE_TO_ADVANCED, value: 80 },
	{ name: 'CSS', skillset: INTERMEDIATE, value: 80 },
	{ name: 'Python', skillset: INTERMEDIATE, value: 70 },
	{ name: 'AWS', skillset: INTERMEDIATE, value: 70 },
	{ name: 'Bash', skillset: INTERMEDIATE, value: 60 },
	{ name: 'Java', skillset: BEGINNER_TO_INTERMEDIATE, value: 50 },
	{ name: 'Kotlin', skillset: BEGINNER_TO_INTERMEDIATE, value: 50 },
];

function CustomTooltip(props: TCustomTooltipProps) {
	const { active, payload } = props;

	if (!active || !payload || !payload.length) return null;

	const { name, value } = payload[0].payload;

	return (
		<div style={{ background: '#222', padding: '1rem', maxWidth: 400 }}>
			<p>{name}</p>
			<p>{value}/100</p>
		</div>
	);
}

export default function Skills() {
	return (
		<div className={styles.skillsWrapper}>
			<h1>
				Skills
				<Blinker />
			</h1>
			<p>
				&gt; I&apos;m a frontend developer with full-stack experience.
				<br />
				&gt; I primarily use TypeScript, React and HTML/CSS in my day to day.
				<br />
				&gt; I also have wide ranging experiences with orchestrating
				infrastructure in the AWS ecosystem.
				<br />
				&gt; Additionally, I also have experience with Python, Java, and Kotlin
				building backend services.
				<br />
			</p>
			<div className={styles.responsiveChartContainer}>
				<ResponsiveContainer height={300}>
					<BarChart data={data} layout="vertical">
						<XAxis type="number" hide tick />
						<YAxis
							type="category"
							width={150}
							dataKey="name"
							tick={({ x, y, payload }) => (
								<text
									x={x}
									y={y}
									dy={8}
									textAnchor="end"
									fill="#666"
									fontSize="1.2rem"
								>
									{payload?.value}
								</text>
							)}
						/>
						<Tooltip
							cursor={{ fill: '#333' }}
							content={({ active, payload }) => (
								<CustomTooltip
									active={active}
									payload={payload as TTooltipPayload}
								/>
							)}
						/>
						<Bar barSize={10} dataKey="value">
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill="var(--primary-color)" />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
