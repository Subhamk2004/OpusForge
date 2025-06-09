import { cn } from "@/lib/client/utils"

const Avatar = ({ className, ...props }) => (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
)

const AvatarImage = ({ className, ...props }) => (
    <img className={cn("aspect-square h-full w-full", className)} {...props} />
)

const AvatarFallback = ({ className, ...props }) => (
    <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
)

export { Avatar, AvatarImage, AvatarFallback }
