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
  Trash2,
  X,
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
import github from "@/assets/github1.png"
import { usePortfolioDeployment } from "@/hooks/usePortfolioDeployment"
import { ToastContainer, toast } from 'react-toastify';
import Root from "@/components/AI/Root"

export default function DashboardPage() {
  const { user } = useSelector((state) => state.user)
  const { portfolios } = useSelector((state) => state.portfolios)
  const { assets } = useSelector((state) => state.assets)
  const { deletePortfolio } = usePortfolioDeployment()

  const [isLoaded, setIsLoaded] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [deletingRepoName, setDeletingRepoName] = useState("");
  const [deletingPortfolioId, setDeletingPortfolioId] = useState("");
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

  // console.log("User Data:", loadedPortfolios);

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
      <ToastContainer />
      {/* <Root /> */}
      {
        isModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-light rounded-2xl p-8 shadow-hard w-full max-w-md relative border border-border-light">
              {/* Header with Icon */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-errorbg rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-textp mb-2">Delete Repository</h2>
                <p className="text-texts text-sm leading-relaxed">
                  Are you sure you want to delete <span className="font-medium text-base text-black">{deletingRepoName}</span> from your GitHub and OpusForge?
                </p>
              </div>

              {/* Warning Message */}
              <div className="bg-p rounded-lg p-4 mb-6 border-l-4 border-error">
                <p className="text-sm text-texts">
                  <span className="font-medium text-error">Warning:</span> This action cannot be undone. All data, commits, and issues will be permanently deleted from your Github and OpusForge.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-error hover:bg-red-700 text-light font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
                  onClick={() => {
                    deletePortfolio(deletingPortfolioId, deletingRepoName, userData.githubUsername)
                    setIsModelOpen(false);
                    setDeletingRepoName("");
                    setDeletingPortfolioId("");
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setIsModelOpen(false);
                    setDeletingRepoName("");
                    setDeletingPortfolioId("");
                  }}
                  className="flex-1 bg-s hover:bg-p text-textp font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }
      <div className="w-full max-w-[1350px]">
        <div className="container mx-auto px-4 pt-10 md:py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <GreetingIcon className="h-6 w-6 text-amber-600" />
                  <h1 className="text-xl md:text-3xl font-bold text-slate-800">
                    {timeGreeting.greeting}, {userData?.name?.split(' ')[0] || 'there'}!
                  </h1>
                </div>
                <p className="text-slate-600 md:text-lg">{timeGreeting.message}</p>

              </div>
            </div>
          </div>
        </div>
        {userData && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap w-full flex-row gap-6 justify-center">
              <ProfileCard data={userData} stats={stats} />
              <div className="flex flex-col lg:flex-row md:h-[300px] justify-between lg:gap-6">
                <div className="flex flex-col md:flex-row h-full gap-6">
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
                  <h2 className="text-lg md:text-3xl font-bold text-slate-800 mb-2">
                    <Briefcase className="hidden md:inline h-7 w-7 md:h-10 md:w-10 mr-2 text-primary p-1 md:p-2 bg-black text-white rounded-full" />
                    Your Portfolios
                    {searchQuery && (
                      <span className="text-xl text-slate-500 ml-2">
                        ({filteredPortfolios.length} found)
                      </span>
                    )}
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base">
                    Manage and showcase your creative work
                  </p>
                </div>
                <Link href="/user/templates" className="bg-black text-white  rounded-xl shadow-lg flex items-center gap-2 px-4 py-2 hover:bg-gray-800 transition-colors text-xs md:text-base">
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
                    hover:shadow-2xl hover:shadow-primary/10  hover:-translate-y-2 bg-white/70 rounded-3xl p-2 md:p-4 ">
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

                      <CardHeader className="pb-4 flex flex-row items-center justify-between group">
                        <CardTitle className="line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300 font-semibold">
                          {portfolio.name}
                        </CardTitle>
                        <CardTitle className="line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300 font-semibold">
                          <Trash2 className="bg-transparent hover:bg-red-100 text-black hover:text-error p-1 h-8 w-8 rounded-lg cursor-pointer" onClick={() => {
                            setDeletingRepoName(portfolio.repoName);
                            setDeletingPortfolioId(portfolio._id);
                            setIsModelOpen(true);
                          }} />
                        </CardTitle>

                      </CardHeader>

                      <div className="flex items-center justify-between ">
                        <Link href={`/user/templates/viewTemplate?id=${portfolio.templateId}&portfolioID=${portfolio._id}`} className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors duration-300 p-3 rounded-lg">
                          <Edit className="h-4 w-4 md:h-5 md:w-5 text-slate-500 hover:text-primary transition-colors duration-300" />
                          <span className="ml-2 text-xs md:text-sm text-slate-600">Edit Portfolio</span>
                        </Link>
                        <div className="flex items-center gap-3">
                          <Link href={`https://github.com/${userData.githubUsername}/${portfolio.repoName}`} target="_blank" className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors duration-300 rounded-full"
                            aria-label="GitHub Repository"
                          >
                            <Image
                              src={github}
                              alt="github icon"
                              className="w-6  md:h-9 md:w-9"
                            />
                          </Link>
                          <button className="deployedUrl text-sm text-white hover:text-primary transition-colors duration-300 p-3 rounded-2xl bg-black ">
                            <Link
                              href={portfolio.deployedUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-xs md:text-base md:gap-2"
                            >
                              <Eye className="h-5 w-5 text-whhite hover:text-primary transition-colors duration-300" />
                              {portfolio.deployedUrl ? "View Portfolio" : "Not Deployed"}
                            </Link>
                          </button>
                        </div>
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