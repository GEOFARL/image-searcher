import { ReactNode } from 'react';
import classes from './Card.module.css';

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface PropTypes {
  children: ReactNode;
  className?: string;
  size?: Size;
}

const Card: React.FC<PropTypes> = ({ children, className, size = 'md' }) => {
  return (
    <div className={`${classes.card} ${classes[size + 'Size']} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
