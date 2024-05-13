interface IProps {
  size?: number;
  className?: string;
}

const Loading = ({ size = 20, className }: IProps) => (
  <div
    style={{ width: `${size}px`, height: `${size}px` }}
    className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${
      className ? className : ''
    }`}
  />
);

export default Loading;
