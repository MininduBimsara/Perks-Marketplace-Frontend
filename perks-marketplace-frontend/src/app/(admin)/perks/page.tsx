import Link from "next/link";

export default function AdminPerksPage() {
	return (
		<div style={{ padding: 24 }}>
			<h1>Admin — Perks</h1>
			<p>This is a placeholder admin perks list page.</p>
			<p>
				<Link href="/admin/perks/create">Create new perk</Link>
			</p>
		</div>
	);
}
