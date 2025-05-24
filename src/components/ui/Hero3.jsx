import HeroCard1 from "../cards/HeroCard1"
import HeroCard2 from "../cards/HeroCard2"

function Hero3() {
    return (
        <div className="w-full flex flex-col items-center no-scrollbar mt-10 p-8 bg-p rounded-3xl">
            <h2 className="text-3xl lg:text-5xl font-semibold text-center lg:mt-10">
                And many more features to try out!
            </h2>
            <HeroCard1 />
            <HeroCard2 />
        </div>
    )
}

export default Hero3