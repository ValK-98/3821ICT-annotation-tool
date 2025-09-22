
const Sidebar = ({children, bottomChildren}) => {
    return (
        <div id="sidebar" className={`
            h-screen flex flex-col bg-background text-foreground
            transition-all duration-100 ease-in-out
            w-[25rem]
        `}>
            {/* The inner content of the sidebar is moved into an inner div for spacing to avoid issues with overflow hidden */}
                <div className={`p-4 flex-grow overflow-y-auto`}>
                    <h1 className="text-xl mt-2 mb-4">LS Control Panel</h1>
                    <nav>
                        <ul>
                            {children}
                        </ul>
                    </nav>
                </div>
                {bottomChildren && (
                    <div className="fixed bottom-0">
                        <div className="flex">
                            {bottomChildren}
                        </div>
                    </div>
                )}
            </div>
    );
};

export default Sidebar