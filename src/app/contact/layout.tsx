import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | CUSGRO",
};

export default function ContactLayout({
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