"use client";
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative rounded-xl border bg-gradient-to-b from-card/50 to-card text-card-foreground",
            "shadow-lg transition-all duration-300 ease-in-out",
            "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
            "backdrop-blur-md bg-opacity-90",
            "before:absolute before:inset-0 before:-z-10",
            "before:rounded-xl before:bg-gradient-to-r before:from-primary/10 before:to-secondary/10",
            "after:absolute after:inset-0 after:-z-20",
            "after:rounded-xl after:bg-gradient-to-tr after:from-primary/5 after:via-secondary/5 after:to-background",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col space-y-2.5 p-6",
            "border-b border-opacity-10",
            "bg-gradient-to-b from-transparent to-card/5",
            className
        )}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-bold leading-tight tracking-tight",
            "bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70",
            "bg-clip-text text-transparent",
            "animate-gradient transition-colors duration-300",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn(
            "text-sm text-muted-foreground/90 leading-relaxed",
            "transition-opacity duration-200 group-hover:opacity-100",
            className
        )}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "p-6 pt-4 text-base leading-relaxed",
            "prose prose-neutral dark:prose-invert",
            "transition-opacity duration-200",
            className
        )}
        {...props}
    />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-between p-6 pt-0 mt-auto",
            "border-t border-opacity-10",
            "bg-gradient-to-t from-transparent to-card/5",
            className
        )}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
}