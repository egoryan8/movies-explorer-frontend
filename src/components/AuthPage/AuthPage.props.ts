import {ReactNode} from "react";

export interface AuthPageProps {
  title: string;
  children: ReactNode;
  caption: Record<string, string>;
}