"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  Search,
  Plus,
  LayoutTemplate,
  Loader2,
  Briefcase,
  Calendar,
  Palette,
  Sun,
  Coffee,
  Sunset,
  SearchCheck,
  Edit,
  Eye,
} from "lucide-react"
import placeholder from "@/assets/placeholder.jpg"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import ProfileCard from "@/components/cards/ProfileCard"
import PortfolioOverview from "@/components/cards/PortfolioOverview"
import AssetOverviewCard from "@/components/cards/AssetOverviewCard"
import LinkOverviewCard from "@/components/cards/LinkOverviewCard"
import Image from "next/image"

export default function DashboardPage() {
  const { user } = useSelector((state) => state.user)
  const { portfolios } = useSelector((state) => state.portfolios)
  const { assets } = useSelector((state) => state.assets)

  const [isLoaded, setIsLoaded] = useState(false)
  const [loadedPortfolios, setLoadedPortfolios] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPortfolios, setFilteredPortfolios] = useState([])
  const [userData, setUserData] = useState({});
  const [loadedAssets, setLoadedAssets] = useState([]);

  useEffect(() => {
    if (user !== undefined) {
      setUserData(user);
      setIsLoaded(true)
    }
    if (portfolios !== undefined && portfolios.length > 0) {
      setLoadedPortfolios(portfolios)
      setFilteredPortfolios(portfolios)
    }
    if (assets !== undefined && assets.length > 0) {
      setLoadedAssets(assets[0])
    }
  }, [user, portfolios, assets])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPortfolios(loadedPortfolios)
    } else {
      const filtered = loadedPortfolios.filter(
        (portfolio) =>
          portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (portfolio.description && portfolio.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredPortfolios(filtered)
    }
  }, [searchQuery, loadedPortfolios])

  const getUserStats = () => {
    const totalPortfolios = loadedPortfolios.length
    const deployedPortfolios = loadedPortfolios.filter((p) => p.deployedUrl && p.deployedUrl !== "").length
    const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"
    const totalAssets = loadedAssets.length

    return {
      totalPortfolios,
      deployedPortfolios,
      joinDate,
      profession: user?.profession || "Developer",
      totalAssets,
    }
  }

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return {
        greeting: "Good morning",
        icon: Sun,
        message: "Ready to create something amazing today?",
        gradient: "from-amber-50 to-orange-50"
      }
    } else if (hour < 17) {
      return {
        greeting: "Good afternoon",
        icon: Coffee,
        message: "Hope your day is going well!",
        gradient: "from-blue-50 to-indigo-50"
      }
    } else {
      return {
        greeting: "Good evening",
        icon: Sunset,
        message: "Time to wind down and reflect on your progress.",
        gradient: "from-purple-50 to-pink-50"
      }
    }
  }

  console.log("User Data:", loadedPortfolios);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/20"></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-slate-700">Loading your workspace</p>
            <p className="text-sm text-slate-500 mt-1">Just a moment...</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = getUserStats()
  const userInitials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "U"

  const timeGreeting = getTimeBasedGreeting()
  const GreetingIcon = timeGreeting.icon

  return (
    <div className="min-h-screen w-full pb-16 flex flex-col items-center ">
      <div className="w-full max-w-[1350px]">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <GreetingIcon className="h-6 w-6 text-amber-600" />
                  <h1 className="text-3xl font-bold text-slate-800">
                    {timeGreeting.greeting}, {userData?.name?.split(' ')[0] || 'there'}!
                  </h1>
                </div>
                <p className="text-slate-600 text-lg">{timeGreeting.message}</p>

              </div>
            </div>
          </div>
        </div>
        {userData && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap w-full flex-row gap-6 justify-center">
              <ProfileCard data={userData} stats={stats} />
              <div className="flex flex-col lg:flex-row h-[300px] justify-between lg:gap-6">
                <div className="flex flex-row h-full gap-6">
                  <PortfolioOverview stats={stats} />
                  <AssetOverviewCard stats={stats} />
                </div>
                <div>
                  <LinkOverviewCard data={userData} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pb-32 mt-12">
          {loadedPortfolios.length > 0 ? (
            <div className="">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    <Briefcase className="inline h-10 w-10 mr-2 text-primary p-2 bg-black text-white rounded-full" />
                    Your Portfolios
                    {searchQuery && (
                      <span className="text-xl text-slate-500 ml-2">
                        ({filteredPortfolios.length} found)
                      </span>
                    )}
                  </h2>
                  <p className="text-slate-600">
                    Manage and showcase your creative work
                  </p>
                </div>
                <Link href="/user/templates" className="bg-black text-white  rounded-xl shadow-lg flex items-center gap-2 px-4 py-2 hover:bg-gray-800 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  New Portfolio
                </Link>
              </div>

              <div className="mb-10">
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search your portfolios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-slate-600 bg-white/70 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                    >
                      ×
                    </Button>
                  )}
                </div>
                {searchQuery && (
                  <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                    <SearchCheck className="h-4 w-4" />
                    Found {filteredPortfolios.length} portfolio{filteredPortfolios.length !== 1 ? "s" : ""} matching "{searchQuery}"
                  </p>
                )}
              </div>

              {filteredPortfolios.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3">
                  {filteredPortfolios.map((portfolio) => (

                    <Card key={portfolio._id} className="overflow-hidden transition-all duration-500 
                    shadow-lg
                    hover:shadow-2xl hover:shadow-primary/10  hover:-translate-y-2 bg-white/70 rounded-3xl p-4 ">
                      {portfolio.portfolioImage && portfolio.portfolioImage.startsWith("https") ? (
                        <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl">
                          <img
                            src={portfolio.portfolioImage || "/placeholder.svg"}
                            alt={portfolio.name}
                            className="h-full w-full object-cover transition-transform duration-700 rounded-2xl group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                          <Image
                            src={placeholder}
                            alt="Portfolio Placeholder"
                            className="h-full w-full object-cover transition-transform duration-700 rounded-2xl group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5"></div>
                        </div>
                      )}

                      <CardHeader className="pb-4">
                        <CardTitle className="line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300 font-semibold">
                          {portfolio.name}
                        </CardTitle>

                      </CardHeader>

                      <div className="flex items-center justify-between ">
                        <Link href={`/user/templates/viewTemplate?id=${portfolio.templateId}&portfolioID=${portfolio._id}`} className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors duration-300 p-3 rounded-lg">
                          <Edit className="h-5 w-5 text-slate-500 hover:text-primary transition-colors duration-300" />
                          <span className="ml-2 text-sm text-slate-600">Edit Portfolio</span>
                        </Link>
                        <button className="deployedUrl text-sm text-white hover:text-primary transition-colors duration-300 p-3 rounded-2xl bg-black ">
                          <Link
                            href={portfolio.deployedUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-5 w-5 text-whhite hover:text-primary transition-colors duration-300" />
                            {portfolio.deployedUrl ? "View Portfolio" : "Not Deployed"}
                          </Link>
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="flex flex-col items-center p-16 text-center bg-white/70 backdrop-blur-sm border-slate-200">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <CardTitle className="mb-3 text-xl text-slate-800">No portfolios found</CardTitle>
                  <CardDescription className="mb-8 text-slate-600 max-w-md">
                    We couldn't find any portfolios matching your search. Try adjusting your search terms or create a new portfolio to get started.
                  </CardDescription>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setSearchQuery("")} className="border-slate-200">
                      Clear search
                    </Button>
                   
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card className="flex flex-col items-center p-20 text-center bg-gradient-to-br from-white to-slate-50 border-slate-200 ">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-8 ">
                <LayoutTemplate className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mb-4 text-2xl text-slate-800">Welcome to your portfolio homepage!</CardTitle>
              <CardDescription className="mb-8 text-slate-600 max-w-lg text-lg leading-relaxed">
                You haven't created any portfolios yet. Start building your first portfolio to showcase your amazing work to the world.
              </CardDescription>
              <Link href="/user/templates" size="lg" className=" shadow-lg bg-black flex items-center justify-center text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Portfolio
              </Link>
            </Card>
          )}
        </div>
      </div>

    </div>
  )
}