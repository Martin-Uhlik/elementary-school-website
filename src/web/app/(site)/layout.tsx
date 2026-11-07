import SiteFrame from "@/components/SiteFrame";

// The public site: header with the menu, cookie bar and footer around every page
const SiteLayout = ({ children }: LayoutProps<"/">) => <SiteFrame>{children}</SiteFrame>;

export default SiteLayout;
