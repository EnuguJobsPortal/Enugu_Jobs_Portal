import { IconProps } from '@/interfaces/general';
import { icons } from 'lucide-react';

const Icon: React.FC<IconProps> = ({ name, color = 'currentColor', size = 24 }) => {
    const LucideIconComponent = icons[name];

    if (!LucideIconComponent) {
        console.error(`Icon '${name}' not found.`);
        return null;
    }

    return <LucideIconComponent color={color} size={size} />;
};
  
export default Icon;