import { ScrollText, HandCoins, MessageSquareText } from "lucide-react"

export const NavLinks = [
    { label: "home", href: "/" },
    { label: "about", href: "/#about" },
    { label: "services", href: "/#services" },
    { label: "feedbacks", href: "/#feedbacks" },
]

export const ServicesContent = [
    { label: "Task Management", description: "Planify: Your sleek and simple to-do app. Effortlessly organize tasks, set priorities, and boost productivity. Stay on top of your commitments with ease", icon: ScrollText },
    { label: "Free Access", description: "Planify: Your free ticket to seamless task management. Unlock efficiency without breaking the bank. Organize tasks, set priorities, and conquer your to-do list, all at no cost.", icon: HandCoins },
    { label: "Support & Communication", description: "Planify goes beyond tasks – we're your support system too. With responsive service and seamless communication, we ensure you're never alone in your productivity journey. Connect with us effortlessly as you conquer your goals with Planify.", icon: MessageSquareText },
]