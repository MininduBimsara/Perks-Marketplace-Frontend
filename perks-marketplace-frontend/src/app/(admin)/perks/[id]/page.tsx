interface Params {
	params: { id: string };
}

export default function AdminPerkDetailPage({ params }: Params) {
	const { id } = params;
	return (
		<div style={{ padding: 24 }}>
			<h1>Perk Details (Admin)</h1>
			<p>Viewing perk with id: {id}</p>
		</div>
	);
}
