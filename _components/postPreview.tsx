import Link from "next/link";
import DateFormatter from "./DateFormatter";

type Props = {
	title: string;
	date: string;
	excerpt: string;
	slug: string;
};

const PostPreview = ({ title, date, excerpt, slug }: Props) => {
	return (
		<div>
			<h3>
				<Link href={`/posts/${slug}`}>{title}</Link>
			</h3>
			<div>
				<DateFormatter dateString={date} />
			</div>
			<p>{excerpt}</p>
		</div>
	);
};

export default PostPreview;
