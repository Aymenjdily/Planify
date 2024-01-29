import { Home, Zap, Check, List, Settings } from 'lucide-react'

export const AdminLinks = [
    { label: "All Tasks", href: "/dashboard", icon: Home },
    { label: "Important", href: "/importants", icon: List },
    { label: "Completed", href: "/completed", icon: Check },
    { label: "Do It Now", href: "/notCompleted", icon: Zap },
]