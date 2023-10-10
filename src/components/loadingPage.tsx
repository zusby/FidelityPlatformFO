import Navbar from "./Navbar";

const Loading = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                <span className="mt-4 text-slate-900 font-sans"><strong>Loading...</strong></span>
            </div></>
    );
}

export default Loading;