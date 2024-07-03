import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  EyeOff,
  Eye,
  Home,
  Plane,
  ArrowLeftRight,
  Repeat,
  PersonStanding,
  Minus,
  Baby,
  UserCheck,
  ChevronDown,
  Armchair,
  AlignJustify,
  LucideIcon,
  Star,
  ArrowDownUp,
  BadgeCheck,
  Timer,
  Info,
  ArrowLeft,
  Pencil,
  CircleAlert,
  TriangleAlert,
  Play,
  SlidersHorizontal,
  Mail,
  Phone,
  Globe,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: Command,
  Plane: Plane,

  Facebook: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
    </svg>
  ),
  MessageCircle: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.76497 19.225C8.35411 18.9652 9.01479 18.9164 9.63316 19.0861C10.4032 19.2963 11.198 19.4019 12.001 19.4C16.5861 19.4 20.001 16.1135 20.001 11.7C20.001 7.28651 16.5861 4 12.001 4C7.41585 4 4.00098 7.28651 4.00098 11.7C4.00098 13.9699 4.89652 15.9722 6.46655 17.3764C7.0418 17.8853 7.38251 18.6082 7.409 19.3822L7.76497 19.225ZM12.001 2C17.6345 2 22.001 6.1265 22.001 11.7C22.001 17.2735 17.6345 21.4 12.001 21.4C11.0233 21.4023 10.0497 21.273 9.10648 21.0155C8.92907 20.9668 8.7403 20.9808 8.57198 21.055L6.58748 21.931C6.34398 22.0386 6.06291 22.018 5.83768 21.8761C5.61244 21.7342 5.47254 21.4896 5.46448 21.2235L5.40998 19.4445C5.40257 19.2257 5.30547 19.0196 5.14148 18.8745C3.19598 17.1345 2.00098 14.6155 2.00098 11.7C2.00098 6.1265 6.36748 2 12.001 2ZM5.99598 14.5365L8.93348 9.8765C9.15689 9.5221 9.51834 9.27728 9.93034 9.2013C10.3423 9.12532 10.7673 9.22511 11.1025 9.4765L13.439 11.2265C13.6528 11.3878 13.9476 11.3878 14.1615 11.2265L17.317 8.8315C17.738 8.512 18.288 9.016 18.006 9.4635L15.0685 14.1235C14.8451 14.4779 14.4836 14.7227 14.0716 14.7987C13.6596 14.8747 13.2346 14.7749 12.8995 14.5235L10.563 12.7735C10.3491 12.6122 10.0543 12.6122 9.84048 12.7735L6.68498 15.1685C6.26398 15.488 5.71398 14.984 5.99598 14.5365Z"></path>
    </svg>
  ),
  Twitter: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
  ),
  Instagram: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
    </svg>
  ),
  Youtube: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  ),
  Linkedin: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z"></path>
    </svg>
  ),
  location: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      className="text-[20px]"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Location_On">
        <g>
          <path d="M12,21.933a1.715,1.715,0,0,1-1.384-.691L5.555,14.5a7.894,7.894,0,1,1,12.885-.009L13.385,21.24A1.717,1.717,0,0,1,12,21.933ZM11.992,3.066A6.81,6.81,0,0,0,7.414,4.815a6.891,6.891,0,0,0-1.05,9.1l5.051,6.727a.725.725,0,0,0,.584.292h0a.732.732,0,0,0,.586-.292l5.044-6.734A6.874,6.874,0,0,0,12.81,3.113,7.277,7.277,0,0,0,11.992,3.066Z"></path>
          <path d="M12,12.5A2.5,2.5,0,1,1,14.5,10,2.5,2.5,0,0,1,12,12.5Zm0-4A1.5,1.5,0,1,0,13.5,10,1.5,1.5,0,0,0,12,8.5Z"></path>
        </g>
      </g>
    </svg>
  ),
  Mail: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      className="text-[15px]"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
    </svg>
  ),
  Phone: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      className="text-[15px]"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57a.84.84 0 00-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 01-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1z"></path>
    </svg>
  ),
  Globe: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      version="1.2"
      baseProfile="tiny"
      viewBox="0 0 24 24"
      className="text-[15px]"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 6c0-.553.447-1 1-1s1 .447 1 1v3c-.552 0-1 .448-1 1s.448 1 1 1c.553 0 1-.448 1-1h1v-2l1 1-1 1c0 3 0 3-2 4 0-1-1-1-3-1v-2l-2-2v-2c-1 0-1 1-1 1l-.561-.561-1.652-1.651c1.167-2.247 3.512-3.788 6.213-3.788.688 0 1.353.104 1.981.29-.086.895-.579 1.71-1.481 1.71-1 0-1.5 1-1.5 2v3s1 0 1-3zm0 10c-3.859 0-7-3.14-7-7 0-.776.133-1.521.367-2.219l1.926 1.926 1 1 1.707 1.707v1.586c0 .552.447 1 1 1 .779 0 1.651 0 2.006.091.038.301.209.582.468.742.168.104.36.16.552.16.145 0 .289-.032.422-.098 2.348-1.174 2.539-1.644 2.552-4.479l.708-.708c.391-.391.391-1.023 0-1.414l-1-1c-.192-.192-.448-.294-.708-.294-.129 0-.259.025-.383.076-.373.155-.617.52-.617.924v-2c0-.689-.351-1.298-.883-1.658.421-.411.712-.995.826-1.685 2.392 1.115 4.057 3.535 4.057 6.343 0 3.86-3.141 7-7 7z"></path>
    </svg>
  ),

  CircleAlert: CircleAlert,
  Pencil: Pencil,
  Play: Play,
  TriangleAlert: TriangleAlert,
  close: X,
  ArrowLeft: ArrowLeft,
  SlidersHorizontal: SlidersHorizontal,
  Info: Info,
  Timer: Timer,
  BadgeCheck: BadgeCheck,
  ArrowDownUp: ArrowDownUp,
  Star: Star,
  menu: AlignJustify,
  UserCheck: UserCheck,
  ChevronDown: ChevronDown,
  PersonStanding: PersonStanding,
  ArrowLeftRight: ArrowLeftRight,
  Repeat: Repeat,
  Minus: Minus,
  Armchair: Armchair,
  User: User,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  Baby: Baby,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  hide: EyeOff,
  view: Eye,

  adult: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M255.7 106.6h-.2c-25 0-45.5-20.3-45.5-45.3 0-25 20.4-45.3 45.5-45.3S301 36.3 301 61.3c0 12.1-4.7 23.5-13.3 32-8.5 8.6-19.9 13.3-32 13.3zM221.2 496c-14.4 0-27-10.5-27-30.4l1-277.6h-10v105c0 9.3-3 15.1-6.4 18.3-4.3 4.1-9.1 6.4-15.2 6.4-6.2 0-10.9-2.3-15.2-6.4-3.4-3.2-6.4-8.9-6.4-18.3V171.4c0-13.8 4.4-27.8 13.8-38.4 10.4-11.6 23.6-18 39-18h122.3c15.4 0 28.6 6.4 39 18.1 9.4 10.6 13.8 24.5 13.8 38.3V293c0 7.3-1.7 13.8-6.6 18.3-4.4 4-9.3 6.2-15.5 6.2s-11.1-2.2-15.5-6.2c-4.9-4.5-6.6-11-6.6-18.3V188h-9v277.6c0 19.7-13.4 30.4-27.8 30.4-13.4 0-26.3-9.3-27.4-29.8V325h-12v140.9c-.7 19.7-13.8 30.1-28.3 30.1z"></path>
    </svg>
  ),
  kids: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      className="text-[20px] text-[#9ba6b2]"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="6" r="2"></circle>
      <path d="M14 9h-4a1 1 0 0 0-.8.4l-3 4 1.6 1.2L9 13v7h2v-4h2v4h2v-7l1.2 1.6 1.6-1.2-3-4A1 1 0 0 0 14 9z"></path>
    </svg>
  ),

  children: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 320 512"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M96 64a64 64 0 1 1 128 0A64 64 0 1 1 96 64zm48 320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V287.8L59.1 321c-9.4 15-29.2 19.4-44.1 10S-4.5 301.9 4.9 287l39.9-63.3C69.7 184 113.2 160 160 160s90.3 24 115.2 63.6L315.1 287c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10L240 287.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H144z"></path>
    </svg>
  ),

  baby: ({ ...props }: LucideProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      className="text-[20px] text-[#9ba6b2]"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H128V251.7c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z"></path>
    </svg>
  ),
  visa: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width="60px"
      height="60px"
      baseProfile="basic"
    >
      <rect width="106" height="4" x="7" y="96" opacity=".35" />
      <rect width="106" height="72" x="7" y="24" fill="#0037ff" />
      <path
        d="M59.427,59.159c-0.047,3.741,3.333,5.826,5.879,7.067c2.615,1.273,3.495,2.09,3.486,3.228 c-0.02,1.743-2.087,2.512-4.023,2.541c-3.376,0.051-5.338-0.911-6.897-1.64l-1.215,5.689c1.566,0.72,4.463,1.351,7.47,1.378 c7.054,0,11.672-3.483,11.696-8.882c0.027-6.853-9.479-7.233-9.414-10.296c0.022-0.928,0.908-1.92,2.85-2.172 c0.962-0.128,3.615-0.224,6.622,1.161l1.181-5.504c-1.618-0.591-3.698-1.154-6.287-1.154 C64.137,50.577,59.465,54.107,59.427,59.159 M88.408,51.051c-1.289,0-2.374,0.752-2.859,1.904L75.473,77.018h7.049l1.403-3.877 h8.616l0.814,3.877h6.213l-5.423-25.967H88.408 M89.395,58.067l2.034,9.752h-5.573L89.395,58.067 M50.881,51.051l-5.557,25.967 h6.718l5.555-25.967H50.881 M40.941,51.051l-6.994,17.674L31.12,53.698c-0.331-1.678-1.642-2.647-3.099-2.647H16.589l-0.157,0.754 c2.347,0.51,5.014,1.331,6.629,2.21c0.989,0.537,1.271,1.007,1.595,2.282l5.358,20.723h7.101L48,51.053L40.941,51.051"
        opacity=".35"
      />
      <path
        fill="#fff"
        d="M59.427,55.159c-0.047,3.741,3.333,5.826,5.879,7.067c2.615,1.273,3.495,2.09,3.486,3.228 c-0.02,1.743-2.087,2.512-4.023,2.541c-3.376,0.051-5.338-0.911-6.897-1.64l-1.215,5.689c1.566,0.72,4.463,1.351,7.47,1.378 c7.054,0,11.672-3.483,11.696-8.882c0.027-6.853-9.479-7.233-9.414-10.296c0.022-0.928,0.908-1.92,2.85-2.172 c0.962-0.128,3.615-0.224,6.622,1.161l1.181-5.504c-1.618-0.591-3.698-1.154-6.287-1.154 C64.137,46.577,59.465,50.107,59.427,55.159 M88.408,47.051c-1.289,0-2.374,0.752-2.859,1.904L75.473,73.018h7.049l1.403-3.877 h8.616l0.814,3.877h6.213l-5.423-25.967H88.408 M89.395,54.067l2.034,9.752h-5.573L89.395,54.067 M50.881,47.051l-5.557,25.967 h6.718l5.555-25.967H50.881 M40.941,47.051l-6.994,17.674L31.12,49.698c-0.331-1.678-1.642-2.647-3.099-2.647H16.589l-0.157,0.754 c2.347,0.51,5.014,1.331,6.629,2.21c0.989,0.537,1.271,1.007,1.595,2.282l5.358,20.723h7.101L48,47.053L40.941,47.051"
      />
    </svg>
  ),
  airplaneSvg: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      strokeLinecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path d="m3 3 3 9-3 9 19-9Z" />
      <path d="M6 12h16" />
    </svg>
  ),
  checkRound: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.3333 6.14857V6.6699C12.3326 7.89187 11.9369 9.08088 11.2053 10.0596C10.4736 11.0383 9.44518 11.7543 8.27336 12.1008C7.10154 12.4472 5.84911 12.4056 4.70286 11.9822C3.55662 11.5587 2.57797 10.776 1.91288 9.7509C1.24778 8.72579 0.931882 7.51314 1.01228 6.29381C1.09269 5.07449 1.56508 3.91382 2.35902 2.98492C3.15296 2.05601 4.22591 1.40863 5.41783 1.13933C6.60976 0.870026 7.85681 0.993234 8.97299 1.49058"
        stroke="#15B17A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M12.3333 2.13659L6.66664 7.80891L4.96664 6.10891"
        stroke="#15B17A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  ),
  Home: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M10 12v.01" />
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
    </svg>
  ),
  Bundle: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-airplay"
      {...props}
    >
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <path d="m12 15 5 6H7Z" />
    </svg>
  ),
  Attractions: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4" />
      <path d="m6.8 15-3.5 2" />
      <path d="m20.7 7-3.5 2" />
      <path d="M6.8 9 3.3 7" />
      <path d="m20.7 17-3.5-2" />
      <path d="m9 22 3-8 3 8" />
      <path d="M8 22h8" />
      <path d="M18 18.7a9 9 0 1 0-12 0" />
    </svg>
  ),
  TramFront: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="16" x="4" y="3" rx="2" />
      <path d="M4 11h16" />
      <path d="M12 3v8" />
      <path d="m8 19-2 3" />
      <path d="m18 22-2-3" />
      <path d="M8 15h.01" />
      <path d="M16 15h.01" />
    </svg>
  ),
  CarFront: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-car-front"
      {...props}
    >
      <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
      <path d="M7 14h.01" />
      <path d="M17 14h.01" />
      <rect width="18" height="8" x="3" y="10" rx="2" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  ),

  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  ),
  twitter: Twitter,
  check: Check,
}
