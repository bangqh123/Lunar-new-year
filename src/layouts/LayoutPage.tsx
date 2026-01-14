import "./LayoutPage.scss"

import React, { type PropsWithChildren } from "react";

interface LayoutPageProps {
    children: React.ReactNode;
}

const LayoutLandingPage: React.FC<LayoutPageProps> = ({ children }: PropsWithChildren) => {
    return (
        <div className="layout-page">
            <main className="content-layout-page">{children}</main>
        </div>
    );
};

export default LayoutLandingPage;