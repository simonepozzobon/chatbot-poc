import { ComponentPropsWithoutRef } from "react";

export type PanelProps = Readonly<{
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[] | string;
}> & ComponentPropsWithoutRef<"div">;

export const Panel = ({ children, ...rest }: PanelProps) => {
  return (
    <div className={`p-2 bg-white shadow-inner rounded ${rest.className}`}>
      {children}
    </div>
  );
}