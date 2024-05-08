"use client"
import * as React from "react"
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { setCookie } from "cookies-next"
import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { PasswordInput } from "../ui/password-input"
import { useAppDispatch } from "@/lib/redux/hooks"
import { user } from "@/lib/redux/slice/user_slice"
import Link from "next/link"
import { postLogin } from "@/app/(auth)/actions"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({
  className,
  setOpenModal,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const loginPage = segment === "login"
  async function onSubmit(data) {
    setIsLoading(true)
    try {
      const res = await postLogin(data)
      if (!res.success) {
        setIsLoading(false)
        return toast({
          title: res.message,
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
        })
      } else {
        toast({
          title: res.message,
        })
        dispatch(user(res))
        localStorage.setItem("b_token", res?.token as string)
        setCookie("b_token", res?.token)
        setOpenModal(false)
        loginPage && router.replace(searchParams?.get("from") || "/")
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            <PasswordInput
              id="password"
              placeholder="password"
              disabled={isLoading || isGitHubLoading}
              {...register("password")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
          <Link
            href={"/forgot-password"}
            className="text-right text-xs text-primary"
          >
            Forget password?
          </Link>
        </div>
      </form>
      {loginPage && (
        <div className="grid gap-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            disabled={isLoading || isGitHubLoading}
          >
            {isGitHubLoading ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 size-4" />
            )}{" "}
            Github
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            disabled={isLoading || isGitHubLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 size-4" />
            )}{" "}
            Google
          </button>
        </div>
      )}
    </div>
  )
}
