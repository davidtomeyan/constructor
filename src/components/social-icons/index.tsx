import type { IconBaseProps } from 'react-icons'

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTelegramPlane,
  FaWhatsapp,
  FaSnapchatGhost,
  FaPinterest,
  FaViber,
  FaSkype,
  FaRedditAlien,
  FaDiscord,
  FaGithub,
  FaGitlab,
  FaBitbucket,
  FaDribbble,
  FaBehance,
  FaPhone,
} from 'react-icons/fa'
import { SiMaildotru } from "react-icons/si";

import { SiGmail, SiMedium } from 'react-icons/si'
import { BsTwitterX } from 'react-icons/bs'

import { ISocialContactPlatform } from '@/payload-types'

export function SocialIcons({
  iconName,
  ...props
}: { iconName: ISocialContactPlatform } & IconBaseProps) {
  switch (iconName) {
    case 'facebook':
      return <FaFacebook {...props} />
    case 'gmail':
      return <SiGmail {...props} />
    case 'x':
      return <BsTwitterX {...props} />
    case 'medium':
      return <SiMedium {...props} />
    case 'email':
      return <SiMaildotru {...props} />
    case 'phone':
      return <FaPhone {...props} />
    case 'instagram':
      return <FaInstagram {...props} />
    case 'linkedin':
      return <FaLinkedin {...props} />
    case 'youtube':
      return <FaYoutube {...props} />
    case 'tiktok':
      return <FaTiktok {...props} />
    case 'telegram':
      return <FaTelegramPlane {...props} />
    case 'whatsapp':
      return <FaWhatsapp {...props} />
    case 'snapchat':
      return <FaSnapchatGhost {...props} />
    case 'pinterest':
      return <FaPinterest {...props} />
    case 'viber':
      return <FaViber {...props} />
    case 'skype':
      return <FaSkype {...props} />
    case 'reddit':
      return <FaRedditAlien {...props} />
    case 'discord':
      return <FaDiscord {...props} />
    case 'github':
      return <FaGithub {...props} />
    case 'gitlab':
      return <FaGitlab {...props} />
    case 'bitbucket':
      return <FaBitbucket {...props} />
    case 'dribbble':
      return <FaDribbble {...props} />
    case 'behance':
      return <FaBehance {...props} />
    default:
      return null
  }
}
