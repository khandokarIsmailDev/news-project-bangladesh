
import News from './News'
import SideNews from './SideNews'
import SearchForm from './Site Forms/SearchForm';



async function getData(news) {
    try {
        const res = await fetch(`https://news-project-bangladesh.vercel.app/api/news_list/${news.endpoint}${news.params}`,
            { cache: "no-store" }
        );
        const data = await res.json()
        if (!data.success) {
            throw new Error("Newslist Fetch failed!", data)
        }
        return data

    } catch (error) {
        throw new Error("Newslist Fetch failed!", error)
    }
}


const NewsList = async ({ news }) => {
    const allNews = await getData(news);
    const { data } = allNews;

    return (
        <section className='py-10 sm:py-12 bg-white'>
            <div className="container">
                <div className="newsListNav  grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-x-12 w-full">

                    <div className='col-span-1 md:col-span-7 lg:col-span-8'>
                        <div className="news_list_heading pb-3 border-b-2 border-b-brand w-full ">
                            <h4 className='text-brand text-2xl font-semibold font-inter capitalize'>{news?.heading} News</h4>
                        </div>
                        <div className='py-6'>
                            <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 sm:gap-y-8 lg:gap-6 xl:gap-8 xl:gap-y-12'>
                                {
                                    data?.length !== 0 && data?.map((el, index) =>
                                        <div key={index}>
                                            <News newsInfo={el} />
                                            <div className="divider sm:hidden"></div>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                    {/* <div className='hidden lg:block lg:col-span-1'></div> */}
                    <div className="searchbar col-span-1 md:col-span-5 lg:col-span-4">
                        <div className='hidden md:block'>
                            <SearchForm />
                        </div>
                        <div className="treanding_container md:mt-5">
                            <SideNews news={{ params: "category", value: "catID=5", heading: "Entertainment" }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsList