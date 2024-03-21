import classNames from 'classnames';
import './Container.scss';

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function Container({children, className}: Props) {
	return <div className={classNames('container', className)}>{children}</div>;
}
