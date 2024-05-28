"use client"
import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { setCookie } from "cookies-next"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/lib/redux/hooks"
import { user } from "@/lib/redux/slice/user_slice"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"
import { registerAuthSchema } from "@/lib/validations/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { registerUser } from "@/app/(auth)/actions"

const UserRegisterForm = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>()
  const [gender, setGender] = React.useState<string>("Male")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerAuthSchema),
  })
  type FormData = z.infer<typeof registerAuthSchema>
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const onSubmit = async (data: FormData) => {
    const requiredFields = [
      "username",
      "first_name",
      "last_name",
      "email",
      "password",
      "phone_number",
    ]
    const emptyFields = requiredFields.filter((field) => !data[field])
    if (emptyFields.length > 0) {
      return toast({
        title: "Required fields are missing",
        description: `Please fill in the following fields: ${emptyFields.join(
          ", "
        )}`,
        variant: "destructive",
        className: "bg-red-500",
      })
    }

    setIsLoading(true)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append("gender", gender)
    if (selectedFile) {
      formData.append("photo", selectedFile)
    }

    const res = await registerUser(formData)

    console.log(res)
    try {
      if (!res.success) {
        setIsLoading(false)
        return toast({
          title: res.message,
          description: "Your Registration in request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
        })
      } else {
        dispatch(user(res))
        localStorage.setItem("b_token", res?.token as string)
        setCookie("b_token", res?.token)
        router.replace(searchParams?.get("from") || "/")
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectedFile(file)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoComplete="username"
              {...register("username")}
            />
            <span className="absolute right-3 top-3 text-red-600">*</span>
            {errors.username && (
              <p className="text-red-600">Username is required</p>
            )}
          </div>
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="username">
              First Name
            </Label>
            <Input
              id="first_name"
              placeholder="First Name"
              type="text"
              autoComplete="First Name"
              {...register("first_name")}
            />
            <span className="absolute right-3 top-3 text-red-600">*</span>
            {errors.first_name && (
              <p className="text-red-600">First name is required</p>
            )}
          </div>
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Last Name
            </Label>
            <Input
              id="last_name"
              placeholder="Last Name"
              type="text"
              autoComplete="Last Name"
              {...register("last_name")}
            />
            <span className="absolute right-3 top-3 text-red-600">*</span>
            {errors.last_name && (
              <p className="text-red-600">Last name is required</p>
            )}
          </div>

          {/* email */}
          <div className="relative grid gap-1">
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
              {...register("email")}
            />
            <span className="absolute right-3 top-3 text-red-600">*</span>
            {errors.email && <p className="text-red-600">Email is required</p>}
          </div>

          <div className="relative">
            <PasswordInput
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600">
                {" "}
                you have to enter at least 6 digit!
              </p>
            )}
          </div>
          {/* Other form fields */}
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Phone
            </Label>
            <Input
              id="phone_number"
              placeholder="Phone"
              type="number"
              autoComplete="phone"
              {...register("phone_number")}
            />
            <span className="absolute right-3 top-3 text-red-600">*</span>
            {errors.phone_number && (
              <p className="text-red-600">Phone number is required</p>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" type="file" onChange={handleFileChange} />
          </div>

          {/* gender */}
          <div className="relative mt-2 grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Gender
            </Label>
            <RadioGroup
              defaultValue={gender}
              className="flex justify-between"
              onValueChange={(value) => setGender(value)}
            >
              <div className="flex w-full items-center space-x-2 rounded border border-destructive px-5 py-1 ">
                <RadioGroupItem
                  value="Male"
                  id="r1"
                  className="border-destructive"
                />
                <Label htmlFor="r1">Male</Label>
              </div>
              <div className="flex w-full items-center gap-2 rounded border border-destructive px-5 py-1 ">
                <RadioGroupItem
                  value="Female"
                  id="r2"
                  className="border-destructive"
                />
                <Label htmlFor="r2">Female</Label>
              </div>
              <div className="flex w-full items-center gap-2 rounded border border-destructive px-5 py-1 ">
                <RadioGroupItem
                  value="Other"
                  id="r2"
                  className="border-destructive"
                />
                <Label htmlFor="r2">Others</Label>
              </div>
            </RadioGroup>
          </div>

          <button className={cn("mt-1", buttonVariants())} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserRegisterForm
