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
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: Command,
  Plane: Plane,
  close: X,
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
