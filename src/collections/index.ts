import {Users} from "@/collections/Users";
import {Media} from "@/collections/Media";
import {Pages} from "@/collections/Pages";
import {CollectionConfig} from "payload";
import { Reviews } from '@/collections/Reviews'
import { Posts } from '@/collections/Posts'

export const collections:CollectionConfig[] = [
    Users,
    Media,
    Pages,
    Reviews,
    Posts
]