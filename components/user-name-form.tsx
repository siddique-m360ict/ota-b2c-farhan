"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn, hostedImage } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { LoginResData } from "@/lib/server/auth/PostLoginEndpoints"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectUser, user as userSlice } from "@/lib/redux/slice/user_slice"
import Image from "next/image"
import { UpdateProfileDetails } from "@/lib/server/auth/UserProfileEndpoints"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof userNameSchema>

export function UserNameForm({ className, ...props }: UserNameFormProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>()
  const userData = useAppSelector((state) => state.user)
  const user = userData?.data
  const [gender, setGender] = React.useState<string | undefined>(user?.gender)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      username: user?.username,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone_number: user?.phone_number,
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("first_name", data.first_name)
    formData.append("last_name", data.last_name)
    formData.append("gender", gender as string)
    if (selectedFile) {
      formData.append("photo", selectedFile)
    }

    try {
      const res = await UpdateProfileDetails({
        body: formData,
        token: userData?.token as string,
      })
      console.log(res)

      if (!res.success) {
        setIsSaving(false)
        return toast({
          title: res.message,
          description:
            "Your Profile Update in request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
        })
      } else {
        toast({
          title: "Profile Updated",
        })
        const updatedUserData = {
          ...userData,
          data: {
            ...user,
            username: res.data?.username,
            first_name: res.data?.first_name,
            last_name: res.data?.last_name,
            gender: res.data?.gender,
            photo: res.data?.photo ? res.data?.photo : user?.photo,
          },
        }
        dispatch(userSlice(updatedUserData))
      }
    } catch (error) {
      console.log(error)
      setIsSaving(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectedFile(file)
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1">
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
              {errors.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>
            <div className="grid gap-1">
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
              {errors.first_name && (
                <p className="text-red-600">{errors.first_name.message}</p>
              )}
            </div>
            <div className="grid gap-1">
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
              {errors.last_name && (
                <p className="text-red-600">{errors.last_name.message}</p>
              )}
            </div>

            {/* email */}
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
                {...register("email")}
                disabled
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Other form fields */}
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="username">
                Phone
              </Label>
              <Input
                id="phone_number"
                placeholder="Phone"
                type="text"
                autoComplete="phone"
                {...register("phone_number")}
                disabled
              />
              {errors.phone_number && (
                <p className="text-red-600">{errors.phone_number.message}</p>
              )}
            </div>

            {/* gender */}
            <div className="mt-2 grid gap-1">
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

            <div className="grid w-full max-w-sm grid-cols-2 items-center gap-1.5">
              <Input id="picture" type="file" onChange={handleFileChange} />
              {/* Display the preview if a file is selected */}
              {selectedFile && (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="airline_logo"
                  width={80}
                  height={80}
                />
              )}
              {/* Display the user's existing photo if available */}
              {!selectedFile && user?.photo && (
                <Image
                  src={hostedImage(`/${user?.photo}`)}
                  alt="airline_logo"
                  width={45}
                  height={45}
                />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn("w-full", buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
