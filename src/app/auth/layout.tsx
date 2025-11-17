interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-50 p-0">
      <div className="w-full max-w-5xl mx-auto p-0">
        {children}
      </div>
    </div>
  );
};

export default Layout;