"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  Search,
  Plus,
  LayoutTemplate,
  BarChart3,
  Loader2,
  Star,
  Briefcase,
  Calendar,
  ExternalLink,
  Palette,
  Sparkles,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

export default function DashboardPage() {
  const { user } = useSelector((state) => state.user)
  const { portfolios } = useSelector((state) => state.portfolios)

  const [isLoaded, setIsLoaded] = useState(false)
  const [loadedPortfolios, setLoadedPortfolios] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPortfolios, setFilteredPortfolios] = useState([])

  useEffect(() => {
    if (user !== undefined) {
      setIsLoaded(true)
    }
    if (portfolios !== undefined && portfolios.length > 0) {
      setLoadedPortfolios(portfolios)
      setFilteredPortfolios(portfolios)
    }
  }, [user, portfolios])

  // Filter portfolios based on search query
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

  // Get user stats
  const getUserStats = () => {
    const totalPortfolios = loadedPortfolios.length
    const deployedPortfolios = loadedPortfolios.filter((p) => p.deployedUrl && p.deployedUrl !== "").length
    const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"

    return {
      totalPortfolios,
      deployedPortfolios,
      joinDate,
      profession: user?.profession || "Developer",
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
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

  return (
    <div className="min-h-screen w-full bg-background pb-12">
      {/* Header Section with User Greeting */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  <span className="flex items-center gap-2">
                    Welcome back, {user?.name || "User"}!
                    <Sparkles className="h-8 w-8 text-yellow-400" />
                  </span>
                </h1>
                <div className="mt-1 flex items-center gap-2 text-slate-300">
                  <Briefcase className="h-4 w-4" />
                  <span>{stats.profession}</span>
                  <span className="text-slate-400">•</span>
                  <Calendar className="h-4 w-4" />
                  <span>Member since {stats.joinDate}</span>
                </div>
              </div>
            </div>
            <Button asChild variant="secondary" size="lg" className="shrink-0">
              <Link href="/user/profile">View Profile</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container -mt-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="overflow-hidden border-none bg-white shadow-lg">
            <CardHeader className="bg-primary/10 pb-2">
              <CardTitle className="text-lg font-medium text-primary">Total Portfolios</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {stats.totalPortfolios}
                </div>
                <CardDescription className="text-base">All your created portfolios</CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none bg-white shadow-lg">
            <CardHeader className="bg-green-500/10 pb-2">
              <CardTitle className="text-lg font-medium text-green-600">Live Portfolios</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl font-bold text-green-600">
                  {stats.deployedPortfolios}
                </div>
                <CardDescription className="text-base">Currently deployed online</CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none bg-white shadow-lg">
            <CardHeader className="bg-amber-500/10 pb-2">
              <CardTitle className="text-lg font-medium text-amber-600">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                  <Star className="h-8 w-8 fill-current" />
                </div>
                <CardDescription className="text-base">
                  {loadedPortfolios.length > 0 ? "Active Builder" : "Getting Started"}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="container mt-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link href="/user/create-portfolio">
              <Plus className="h-5 w-5" />
              Create New Portfolio
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/user/templates">
              <LayoutTemplate className="h-5 w-5" />
              Browse Templates
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="gap-2">
            <Link href="/user/analytics">
              <BarChart3 className="h-5 w-5" />
              View Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mt-10">
        {loadedPortfolios.length > 0 ? (
          <div>
            {/* Search Bar */}
            <div className="mb-8 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search your portfolios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Found {filteredPortfolios.length} portfolio{filteredPortfolios.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Portfolios Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">
                Your Portfolios
                {searchQuery && ` (${filteredPortfolios.length} found)`}
              </h2>

              {filteredPortfolios.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPortfolios.map((portfolio) => (
                    <Link
                      key={portfolio._id}
                      href={`/user/templates/viewTemplate?id=${portfolio.templateId}&portfolioID=${portfolio._id}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-primary/50">
                        {/* Portfolio Image */}
                        {portfolio.portfolioImage ? (
                          <div className="aspect-video overflow-hidden bg-muted">
                            <img
                              src={portfolio.portfolioImage || "/placeholder.svg"}
                              alt={portfolio.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <Palette className="h-12 w-12 text-slate-400" />
                          </div>
                        )}

                        {/* Portfolio Content */}
                        <CardHeader>
                          <CardTitle className="line-clamp-1 text-xl group-hover:text-primary">
                            {portfolio.name}
                          </CardTitle>
                          {portfolio.description && (
                            <CardDescription className="line-clamp-2">{portfolio.description}</CardDescription>
                          )}
                        </CardHeader>

                        <CardFooter className="flex items-center justify-between border-t pt-4">
                          <Badge
                            variant={portfolio.deployedUrl && portfolio.deployedUrl !== "" ? "success" : "secondary"}
                          >
                            {portfolio.deployedUrl && portfolio.deployedUrl !== "" ? (
                              <span className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" /> Live
                              </span>
                            ) : (
                              "Draft"
                            )}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(portfolio.createdAt || portfolio.updatedAt).toLocaleDateString()}
                          </span>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                /* No Search Results */
                <Card className="flex flex-col items-center p-12 text-center">
                  <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                  <CardTitle className="mb-2">No portfolios found</CardTitle>
                  <CardDescription className="mb-6">
                    Try adjusting your search terms or create a new portfolio.
                  </CardDescription>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </Card>
              )}
            </div>
          </div>
        ) : (
          /* Empty State - No Portfolios */
          <Card className="mt-8 flex flex-col items-center p-12 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Palette className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="mb-4 text-3xl">Ready to build your first portfolio?</CardTitle>
            <CardDescription className="mb-8 max-w-md text-lg">
              Create stunning portfolios in minutes with our professional templates and easy-to-use builder.
            </CardDescription>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/user/create-portfolio">
                  <Plus className="h-5 w-5" />
                  Create Your First Portfolio
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/user/templates">
                  <LayoutTemplate className="h-5 w-5" />
                  Browse Templates
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}