import { ComponentPropsWithoutRef } from 'react';

export type PanelProps = Readonly<{
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[] | string;
}> &
  ComponentPropsWithoutRef<'div'>;

export const Panel = ({ children, ...rest }: PanelProps) => {
  return <div className={`rounded bg-white p-2 shadow-inner ${rest.className}`}>{children}</div>;
};
