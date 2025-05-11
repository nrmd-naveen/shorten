import Form from "@/components/Form";

export default function Shorten() {

    return (
        <div className=" w-full flex items-center justify-center">
            <div className=" flex flex-col justify-center items-center w-full min-w-[80%] bg-gradient-to-br from-gray-950 to-gray-900 text-white">
                      <h1 className="pt-16 text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Get Your <span className="text-green-400">Shortened Link</span>
                        </h1>
                      <Form />
                    </div>
        </div>
    )
}