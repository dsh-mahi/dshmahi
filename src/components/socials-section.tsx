'use client';
import { Github, Instagram, Linkedin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import WhatsAppIcon from '@/components/icons/whatsapp-icon';
import { useSpotlight } from '@/hooks/use-spotlight';
import { useRef } from 'react';


const socialLinks = [
  {
    name: 'WhatsApp',
    handle: 'Let\'s have a chat!',
    href: '#',
    icon: Phone,
    color: 'text-[#25D366]',
    borderColor: 'border-[#25D366]',
  },
  {
    name: 'Instagram',
    handle: 'My creative side',
    href: '#',
    icon: Instagram,
    color: 'group-hover:text-[#E4405F]',
    borderColor: 'group-hover:border-[#E4405F]',
  },
  {
    name: 'LinkedIn',
    handle: 'My professional network',
    href: '#',
    icon: Linkedin,
    color: 'group-hover:text-[#0A66C2]',
    borderColor: 'group-hover:border-[#0A66C2]',
  },
  {
    name: 'GitHub',
    handle: 'My code repository',
    href: '#',
    icon: Github,
    color: 'group-hover:text-white',
    borderColor: 'group-hover:border-white',
  }
];

const SocialCard = ({ link, index }: { link: (typeof socialLinks)[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { spotlightStyle } = useSpotlight(cardRef);
  const Icon = link.icon;
  
  return (
    <a href={link.href} key={index} target="_blank" rel="noopener noreferrer">
      <Card ref={cardRef} className="group bg-background/70 backdrop-blur-sm hover:border-muted-foreground/50 transition-all duration-300 h-48 flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg hover:shadow-primary/10 relative">
        <div 
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={spotlightStyle}
        />
        <div className="relative z-10">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 border border-muted-foreground transition-colors ${link.borderColor}`}>
              <Icon className={`h-4 w-4 text-muted-foreground transition-colors ${link.color}`} />
            </div>
            <p className={`text-sm font-semibold text-foreground transition-colors ${link.color}`}>{link.name}</p>
            <p className="text-xs text-muted-foreground">{link.handle}</p>
          </CardContent>
        </div>
      </Card>
    </a>
  )
}

export default function SocialsSection() {
  return (
    <section id="socials" className="min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-left mb-12">
          <p className="text-sm font-bold uppercase text-muted-foreground mb-2">Connect</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Great</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have an idea, a project, or just want to say hi? My digital door is always open. Let's connect and create!
          </p>
        </div>
        <hr className="border-accent mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialLinks.map((link, index) => (
            <SocialCard link={link} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
