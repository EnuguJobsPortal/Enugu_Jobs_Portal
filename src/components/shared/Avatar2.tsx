import { AvatarProps2 } from "@/interfaces/general";

const Avatar2: React.FC<AvatarProps2> = ({ name, className, initialsClass }) => {
	const initials = name?.split(' ')
	.map((part) => part[0]).join('')
	.toUpperCase();
	
	return (
		<div className={`${className}`}>
			<p className={`${initialsClass}`}>{initials}</p>
		</div>
	);
};

export default Avatar2;