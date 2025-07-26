import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | CUSGRO",
};

export default function PricingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="left-0 w-full h-full">
            {children}
        </div>
    );
}