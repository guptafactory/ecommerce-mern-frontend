function Loader() {
  return <div>Loading....</div>;
}

export default Loader;

type skeletonProps = {
  width?: string;
  count?: number;
};

export const SkeletonLoader = ({
  width = "unset",
  count = 3,
}: skeletonProps) => {
  return (
    <div className="skeleton-loader" style={{ width }}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-shape"></div>
      ))}
      <div>loading....</div>
    </div>
  );
};
